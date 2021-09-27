import {writeFile} from 'fs';

const targetPath = 'src/environments/google.environment.ts';

const envConfigFile = `export const google = {
  BLOG_PRIVATE_KEY: '${process.env.BLOG_PRIVATE_KEY}',
  BLOG_CLIENT_EMAIL: '${process.env.BLOG_CLIENT_EMAIL}'
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});