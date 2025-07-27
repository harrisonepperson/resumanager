import DOMPurify from 'dompurify';
import { Marked } from 'marked';
import { useEffect, useRef, useState } from 'react';

import {config} from '../../config';
import classes from './Preview.module.scss';

const marked = new Marked({});

export const Preview = ({ customStyles, sections }) => {
  const styleShim = useRef();

  const [pages, setPages] = useState(null);
  const [fontInfo, setFontInfo] = useState('');

  useEffect(() => {
    if (customStyles.fontUrl) {
      (async () => {
        const font = customStyles.fontUrl.split('specimen/').pop();

        const fontRes = await fetch(
          `https://fonts.googleapis.com/css?family=${font.replace(' ', '+')}`
        );

        if (fontRes.status === 200) {
          const fontText = await fontRes.text();

          setFontInfo(`
            ${fontText.replace(
              /(font-family:)(.*);\n/g,
              '$1 resumeManagerBody;\n'
            )}
          `);
        }
      })();
    }
  }, [customStyles.fontUrl]);

  useEffect(() => {
    const pageStrings = sections
      .map(({ accolades, content, hidden = false, title }) => {
        if (hidden) {
          return null;
        }

        const a = accolades
          ? accolades
              .map(({ content, hidden }) =>
                hidden || !content ? null : `- ${content}`
              )
              .filter((accolade) => !!accolade)
              .join('\n')
          : '';

        return `${title ? `# ${title}\n` : ''}${content || ''}${
          a ? `\n${a}` : ''
        }`;
      })
      .filter((section) => !!section);

    const pageElements = pageStrings.map((page) => {
      return marked.parse(page);
    });

    const longPage = DOMPurify.sanitize(
      pageElements.join(
        `<br style='margin-bottom: ${customStyles.sectionGap}'/>`
      )
    );

    const vPage = document.createElement('div');
    vPage.innerHTML = longPage;

    vPage.style.position = 'absolutely';
    vPage.style.left = '-9999px';
    vPage.style.top = '-9999px';
    vPage.style.visibility = 'hidden';
    vPage.style.maxWidth = `calc(8.5in - 2 * ${customStyles.padding})`;
    vPage.style.width = `calc(8.5in - 2 * ${customStyles.padding})`;
    vPage.style.minWidth = `calc(8.5in - 2 * ${customStyles.padding})`;
    vPage.style.fontFamily = `'resumeManagerBody', serif`;
    vPage.style.fontSize = customStyles.fontSize;
    vPage.classList.add(classes.stub);

    const maxHeightPerPageInPx =
      (11 - 2 * Number(customStyles.padding.split('in').shift())) * 96;

    document.body.appendChild(vPage);

    const pages = [];

    for (const child of vPage.children) {
      if (pages.length === 0) {
        pages.push([child]);
      } else {
        const distanceFromChildBottomToPageTop =
          child.offsetHeight +
          child.offsetTop -
          pages[pages.length - 1][0].offsetTop;

        if (distanceFromChildBottomToPageTop > maxHeightPerPageInPx) {
          switch (child.nodeName) {
            case 'BR':
              // We don't want to start a new page with a break, we'll just let the next element have its spot
              break;
            case 'LI':
            // technically we should split the parent list in 2
            // but for now we're just gonna let it slip into default
            // eslint-ignore-next-line
            default:
              pages.push([child]);
              break;
          }
        } else {
          pages[pages.length - 1].push(child);
        }
      }
    }

    document.body.removeChild(vPage);

    setPages(pages);
  }, [sections, customStyles]);

  useEffect(() => {
    styleShim.current.innerHTML = fontInfo;
  }, [fontInfo]);

  return (
    <>
      <style ref={styleShim}></style>
      {pages?.map((page, i) => {
        return (
          <div
            className={classes.paper}
            dangerouslySetInnerHTML={{
              __html: page.map((element) => element.outerHTML).join(''),
            }}
            style={{
              fontFamily: `'resumeManagerBody', serif`,
              fontSize: customStyles.fontSize,
              padding: customStyles.padding,
            }}
          />
        );
      })}
    </>
  );
};
