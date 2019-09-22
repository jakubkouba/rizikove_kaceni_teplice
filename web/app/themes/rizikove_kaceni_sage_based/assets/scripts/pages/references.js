/**
 * Created by wizard on 28/09/15.
 */


module.exports = (function(){

    var $nextButton     = $('#next'),
        $references     = $('#references'),
        $referenceTmpl  = $('#references-tmpl'),
        page            = 1,

        getReferences = function () {

            return $.ajax({
                url: '/wp/wp-admin/admin-ajax.php',
                type: 'get',
                dataType: 'json',
                data: {
                    action: 'get_references',
                    post_id: $references.data('postId'),
                    page: ++page
                },
                success: function (response) {
                },
                error: function (jqXHR, status, err) {
                    console.log(status);
                    console.log(err);
                }
            });
        },

        displayReferences = function(){
            $nextButton.click(function (event) {
                event.preventDefault();
                getReferences().done(function (response) {
                    console.log(response);
                    Mustache.parse($referenceTmpl.html());
                    $references.append(Mustache.render($referenceTmpl.html(), { references: response.data } ));
                });
            });
        };

        return {
            init: function() {
                displayReferences();
            }
        };


})();