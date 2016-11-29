$(document).ready(function(){

    $.ajax({
        type: "GET",
        url: "/get",
        success: function(data){
            $(data).each(function(){
                $('#studentTable tr:first').after(
                    '<tr>'
                        + '<td tabindex=1>' + this.sid + '</td>'
                        + '<td tabindex=1>' + this.fname + '</td>'
                        + '<td tabindex=1>' + this.lname + '</td>'
                        + '<td tabindex=1 class="github_url">' + this.repo + '</td>'
                        + '<th class="deleteRow" tabindex=1>' + '<i class="fa fa-trash-o" aria-hidden="true"> </i><input type="hidden" value="'+ this._id +'">' + '</th>'

                    + '</tr>'
                )
            })

            $('.deleteRow').click(function(){
                var idToDelete = $(this).parent().children().find('input').attr('value')
                var trFather = $(this).parent()
                $.ajax({
                    type: "POST",
                    url: "/delete",
                    data: {
                        id: idToDelete,
                    },
                    success: function(){
                        $(trFather).remove()
                    }
                })
            })
        }
    });


    $('#studentTable').editableTableWidget();
    row(); //This function allows the table to append rows as it increases.

    $('#saveAll').click(function(){
        createJson();
        //github();
    })

});
function row(){
    $('table td').on('change', function(evt, newValue) {
    	// do something with the new cell value
        var tr = $(this).parent();

        studentId = tr.children().eq(0).html();
        firstName = tr.children().eq(1).html();
        lastName = tr.children().eq(2).html();
        repository = tr.children().eq(3).html();

        if($(tr).attr('class') == "lastRow"){
            if(studentId != "&nbsp;" && firstName != "&nbsp;" && lastName != "&nbsp;" && repository != "&nbsp;"){
                // Add Delete Icon

                // Add new row
                $('#studentTable').append(
                    '<tr class="lastRow">'
                        +'<td>&nbsp;</td>'
                        +'<td>&nbsp;</td>'
                        +'<td>&nbsp;</td>'
                        +'<td class="github_url">&nbsp;</td>'
                        +'<td>&nbsp;</td>'
                    +'</tr>'
                );
                $(tr).attr('class', '');
                $('#studentTable').editableTableWidget();
                row();
            }
        }

    	if (newValue == "34") {
    		return false; // reject change
    	}
    });
}


function createJson(){
    jsonObj = [];

    $('#studentTable > tbody  > tr').each(function() {
        item = {}

        item["studentId"] = $(this).children().eq(0).text();
        item["firstName"] = $(this).children().eq(1).text();
        item["lastName"] = $(this).children().eq(2).text();
        item["repository"] = $(this).children().eq(3).text();
        item["obID"] = $(this).children().eq(4).find('input:hidden').val();
        
        if(item["studentId"] != 'Student ID')
            jsonObj.push(item);

    });
    jsonObj.splice(-1,1);

    //console.log(jsonObj)

    jsonString = JSON.stringify(jsonObj);
    //sending student info to be inserted or updated
    $.ajax({
        type: "POST",
        url: "/save",
        data: { students: jsonString }
    });

}

function github(){
    var website = "https://api.github.com/repos/"
    $("#results").html("");
    $(".github_url").each(function(){
        // Get Student URL Project
        var githubURL = $(this).text();

        // Parsing Table Urls
        var parseRepoURL =  githubURL.split("/");
        var user = parseRepoURL[3];
        var repo = parseRepoURL[4];
        if(user === null || repo === null)
            return;
        // New Urls
        var repositoryJsonURL = website + user + "/" + repo
        var contributorsJsonURL = repositoryJsonURL + "/contributors"

        // Get Repo Info

        $.ajax({
            type: "GET",
            url: repositoryJsonURL,
            //url: "jsontests/repository.json",
            dataType: "json",
            async: false,
            success: function(result){

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
                $(result).each(function(){
                    $("#results").append(
                        //'<div>'+
                            //this.login
                            '<a href="'+this.html_url+'" target="_blank">'
                            +'<img src="'+this.avatar_url+'" height="200px" width="200px" alt="'+this.login+'">'
                            +'</a>'
                        //+'</div>'
                    );
                });
            }
        });
    });
}

