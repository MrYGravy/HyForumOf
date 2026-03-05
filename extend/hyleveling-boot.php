<?php

use Flarum\Extend;

return [
  (new Extend\Frontend('forum'))
    ->js(__DIR__ . '/../public/assets/hyleveling-boot.js'),
];

