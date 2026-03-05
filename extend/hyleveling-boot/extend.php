<?php

use Flarum\Extend;

return [
  (new Extend\Frontend('forum'))
    ->js(__DIR__.'/assets/hyleveling-boot.js')
];

