export const baseURL = 'https://samsungvr.com';
export const channelPath = `${baseURL}/view/`;
export const topChannelURL = `${channelPath}top_channel.json`;
export const thumbPathSm = `${baseURL}/resource/item/jpg_thumbnail/`;
export const thumbPathLg = `${baseURL}/resource/item/jpg_thumbnail_1280/`;
export const webPromoURL = `${channelPath}web_promo.json`;
export const embedSourcePath = `${baseURL}/watch/`;

export const routes = [{
  path: '/',
  title: 'Home',
}, {
  path: '/variants/fs-video',
  title: 'Full Screen Video',
}, {
  path: '/variants/fs-video-carousel',
  title: 'Full Screen Video (with carousel)',
}, {
  path: '/variants/fs-image',
  title: 'Full Screen Image',
}, {
  path: '/variants/nothing',
  title: 'No Header',
}];
