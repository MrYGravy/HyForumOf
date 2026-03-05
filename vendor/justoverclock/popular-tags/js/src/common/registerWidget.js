import Widgets from 'flarum/extensions/afrux-forum-widgets-core/common/extend/Widgets';

import PopularTags from './components/PopularTags';

export default function (app) {
  new Widgets()
    .add({
      key: 'PopularTags',
      component: PopularTags,
      isDisabled: false,
      isUnique: true,
      placement: 'end',
      position: 1,
    })
    .extend(app, 'justoverclock-popular-tags');
}
