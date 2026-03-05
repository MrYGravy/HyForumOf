<?php

use Flarum\Extend;

return [
    // Inyecta nuestro CSS en el frontend del foro
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/assets/reset.css'),
];
