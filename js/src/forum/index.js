import { extend } from 'flarum/common/extend';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import {Fancybox} from '@fancyapps/ui';

//init
var limit = 15;
var gallery;
var discussionPosts;


//DiscussionPage - oncreate/onupdate
extend(DiscussionPage.prototype, 'oninit', function() {

    //send get request for images
    imageXHR(this.attrs.id, limit);

    console.log('init');

});





//extend DiscussionPage sidebarItems with Image Gallery from the selected topic
extend(DiscussionPage.prototype, 'sidebarItems', function(items) {

    if (items.has('gallery')) {
        items.setContent('gallery', gallery);
    } else {
        items.add('gallery', gallery, -200);
    }

});


//generate gallery html
function imageGallery(imageArray) {

    var mArray = new Array();

    imageArray.forEach(element => {
        mArray.push(
            m("li", {}, [
                m("a", { href: element, class: 'fancybox-ready', 'data-fancybox': 'topic-gallery' }, [
                    m("img", { src: element })
                ])
            ])
        );
    });

    return m("div", { class: "topic-gallery" }, [
        m("h5", {}, 'Képgaléria'),
        m("ul", {}, mArray),
        m("button", {
            onclick() {
                galleryButton();
            },
            class: 'inactive'
        }, "Megjelenítés")
    ]);

}


//handle gallery button
function galleryButton() {
    if ($('.topic-gallery button').hasClass('inactive')) {
        discussionPosts = $('div.DiscussionPage-stream').html();
        $('.topic-gallery button').html('Elrejtés').removeClass('inactive').addClass('active');
        $('div.DiscussionPage-stream').html('teszt 1');
    } else {
        $('.topic-gallery button').html('Megjelenítés').removeClass('active').addClass('inactive');
        $('div.DiscussionPage-stream').html(discussionPosts);
    }
}



//get request
function imageXHR(id, limit) {
    m.request({
        method: "GET",
        url: "https://m500.pazirikkft.hu/teszt.php",
        async: true,
        withCredentials: true,
        params: {id: id, limit: limit}
    })
    .then(function(result) {
        gallery = imageGallery(result.data);
        Fancybox.bind('[data-fancybox="topic-gallery"]', {
            // Your custom options
        });
    })
}


//Fancybox.fromNodes();