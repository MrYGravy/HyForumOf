<?php

use Flarum\Extend;
use Flarum\Frontend\Document;

return [
    (new Extend\Frontend('forum'))
        ->content(function (Document $doc) {
            // timestamp del archivo = número único
            $v = filemtime(__DIR__.'/../../public/assets/hyleveling/theme.css');
            $doc->head[] = '<link rel="preload" as="style" href="/assets/hyleveling/theme.css?v='.$v.'">';
            $doc->head[] = '<link rel="stylesheet" href="/assets/hyleveling/theme.css?v='.$v.'">';
        }),
];
