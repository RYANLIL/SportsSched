//var moment = require('moment-timezone');
$(document).on('click','.page-header', function(){
    console.log('sending json');
    $.ajax({
          type: "POST",
          url: "/",
          data: JSON.stringify({ test: 'test' })
        });
});
$(document).ready(function(){

    

    var website = "https://api.github.com/repos/"

    $(".github_url").each(function(){
        // Get Student URL Project
        var githubURL = $(this).text();

        // Parsing Table Urls
        var parseRepoURL =  githubURL.split("/");
        var user = parseRepoURL[3];
        var repo = parseRepoURL[4];

        // New Urls
        var repositoryJsonURL = website + user + "/" + repo
        var contributorsJsonURL = repositoryJsonURL + "/contributors"
        console.log(repositoryJsonURL);
        console.log(contributorsJsonURL);

        // Get Repo Info

        $.ajax({
            type: "GET",
            url: repositoryJsonURL,
            //url: "jsontests/repository.json",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);

                $("#results").append(
                    '<h3>'+
                        '<a href="'
                            + result.html_url +'">'
                            + result.name
                            +'&nbsp;<i class="fa fa-github" aria-hidden="true"></i>'
                        +'</a>'
                        //+'<a class="github-button" href="https://github.com/ntkme/github-buttons" data-icon="octicon-star" data-style="mega" data-count-href="/ntkme/github-buttons/stargazers" data-count-api="/repos/ntkme/github-buttons#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star ntkme/github-buttons on GitHub">Star</a>'
                    +'</h3>');
                $("#results").append(
                    '<p>'
                        +'<strong>Created at: </strong>'+result.created_at
                        +'<strong> Last update: </strong>'+result.updated_at
                        +'<strong> Days since last update:</strong>'
                    +'</p>'
                );


            }
        });

        $.ajax({
            type: "GET",
            url: contributorsJsonURL,
            //url: "jsontests/contributors.json",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                console.log(result.length)
                $(result).each(function(){
                    $("#results").append(
                        //'<div>'+
                            //this.login
                            '<a href="'+this.html_url+'">'
                            +'<img src="'+this.avatar_url+'" height="200px" width="200px" alt="'+this.login+'">'
                            +'</a>'
                        //+'</div>'
                    );
                });


            }
        });



    });
});
