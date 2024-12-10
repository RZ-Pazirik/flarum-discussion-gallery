<?php

/*
 * This file is part of rz-pazirik/flarum-discussion-gallery.
 *
 * Copyright (c) 2024 RZ.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace RZPazirik\FlarumDiscussionGallery;
use Flarum\Extend;
use RZPazirik\FlarumDiscussionGallery\HelloWorldController;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Routes('api'))
        ->get('hello-world', 'helloWorld.index', HelloWorldController::class)
];


use Laminas\Diactoros\Response\HtmlResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;

class HelloWorldController implements RequestHandlerInterface
{
    public function handle(Request $request): Response
    {
        return new HtmlResponse('<h1>Hello, world!</h1>');
    }
}
