import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.42857;
    color: #333;
    background: #F6F6F6;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    display: flex;
    flex-direction: column;
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;

export const buttonStyle = `
  display: inline-flex;
  padding: 7px 24px;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid transparent;
  color: white;
  background: #508ffb;
  transition: all 0.2s ease;

  &:hover {
    background: #2273FB;
  }
`;

export const linkStyle = `
  display: inline-flex;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #404040;
  margin: 0 0.65em;
  padding: 0.25em;
  transition: all 0.2s ease;

  &:hover {
    color: #222;
  }
`;
