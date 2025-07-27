[Configuration Example](./docs/resume_picture_configure.png)

[Output Example](./docs/resume_picture_output.png)

# Resumanager

A browser based applications for streamlining updating your resume for different applications.  Rather than using an identical resume for multiple job applications you can easily tailor your resume to highlight areas where your skills and experience match with the job description.

## Running the app

```bash
$ npm i
$ npm run start
```

## Features

- Side by side view with live updates to your resume
- Drag and drop editor to easily reorganize your top level sections and individual accolades
- Mark down editing for inline styling
- Layout and font customizations
- Toggleable visibility to retain the information in your master copy but hide it in your resume
- Import and Export to save your master copy locally

## Use

- If you are returning, import your saved `.resume` file on the "Import" tab otherwise ...
- On the "Editor" tab "Add a section"
  - Click the pencil icon to edit the section title and description
  - Click the plus icon to add a bullet point for the section
- Repeat adding sections and accolades
- On the "Format" tab adjust as desired
- On the "Export" tab save your config as a `.resume` file somewhere you'll remember for later
- To access your compiled resume, print the webpage
  - You can choose to print directly to a physical printer or save to a PDF
  - Please note: Some configurations can cause an empty page to be appended to the end of the print.  You can restrict the number of pages that are printed in the browser/system dialog

## Getting the most of it

Beyond the basic usage, there are a few tips to getting the most out this project.  First and foremost save your work!  There is no persistent state, no server, and no writing to local storage.  If you want to work on your resume across multiple sessions, you **must** export your config.  This tool is best used to tune *down* a resume rather than building one from the ground up.  This leads to two further insights: 1) draft your resume in an external editor like [**Libre**Office](https://www.libreoffice.org/) first then copy the information over and 2) build out a full resume with all your sections, experiences, and accolades first then use the features of Resumanager to hide or reorganize as appropriate to tailor your resume to a job description.

## Examples

- An example template is located at [docs/example_template.resume](./docs/example_template.resume) with the example output at [docs/Example_Resume.pdf](./docs/Example_Resume.pdf)
  - That's my actual resume, and I'm looking for a job, so if you like what you see in my resume or project, why not [reach out](me@harrisonepperson.com)?