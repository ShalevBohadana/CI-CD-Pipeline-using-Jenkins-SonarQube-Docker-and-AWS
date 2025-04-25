/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

/** @type {import('postcss-load-config').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  plugins: [tailwindcss, autoprefixer],
};
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };
