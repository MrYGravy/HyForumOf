import app from 'flarum/admin/app';
import registerWidget from '../common/registerWidget';

app.initializers.add('justoverclock/popular-tags', () => {
  registerWidget(app);
  app.extensionData.for('justoverclock-popular-tags').registerSetting({
    setting: 'justoverclock-popular-tags.numberOfTags',
    name: 'justoverclock-popular-tags.numberOfTags',
    type: 'number',
    label: app.translator.trans('justoverclock-popular-tags.admin.limit'),
    help: app.translator.trans('justoverclock-popular-tags.admin.limit-help'),
  });
});
