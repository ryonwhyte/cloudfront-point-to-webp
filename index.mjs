import UAParser from 'ua-parser-js';
import path from 'path';

export const handler = async (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  const userAgentString = headers['user-agent'] && headers['user-agent'][0] ? headers['user-agent'][0].value : null;

  // Initialize UA parser and get result from userAgentString
  const parser = new UAParser();
  const agent = parser.setUA(userAgentString).getResult();

  //Debugger
  //console.log("New Agent is: ", agent);

  const browsersToInclude = [
    { browser: 'Chrome', version: 23 },
    { browser: 'Edge', version: 18 },
    { browser: 'Safari', version: 14 },
    { browser: 'Firefox', version: 65 },
    { browser: 'Opera', version: 12 },
    { browser: 'Chrome Mobile', version: 55 },
    { browser: 'Android', version: 53 },
    { browser: 'Mobile Safari', version: 14 },
    { browser: 'Opera Mobile', version: 37 },
    { browser: 'UC Browser', version: 11 },
    { browser: 'Samsung Internet', version: 4 },
    { browser: 'Baidu', version: 13 },
    { browser: 'KaiOS', version: 3 },
    { browser: 'Opera [GX/Mini/Mobi/Tablet]', version: 1 }
  ];

  const supportingBrowser = browsersToInclude
    .find(browser => browser.browser === agent.browser.name && parseInt(agent.browser.version, 10) >= browser.version);

  if (supportingBrowser) {  // Check if the browser is supported
    const fileFormat = path.extname(request.uri).replace('.', '');
    request.headers['original-resource-type'] = [{
      key: 'Original-Resource-Type',
      value: `image/${fileFormat}`
    }];

    const olduri = request.uri;
    //gif and raw may not be necessary
    const newuri = olduri.replace(/(\.jpg|\.png|\.jpeg|\.gif|\.raw)$/g, '.webp');
    request.uri = newuri.replace('/original/', '/optimized/');
  }

  return callback(null, request);
};