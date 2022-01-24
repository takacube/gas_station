function myFunction() {
    const twitterfollower_count = count_follower_of_twitter();
    Logger.log(twitterfollower_count);
}

function count_follower_of_twitter() {
    const prop = PropertiesService.getScriptProperties().getProperties();
    const USER_NAME = prop.USER;
    const TOKEN = prop.TOKEN;
    const url = "https://api.twitter.com/2/users/by/username/" + USER_NAME  + "?user.fields=public_metrics"; 
    const options = {
        "method": "get",
        "headers": {
        "authorization": "Bearer " + TOKEN
        },
    };
    const response = JSON.parse(UrlFetchApp.fetch(url, options));
    Logger.log(response);
    let follower = response["data"]["public_metrics"]["followers_count"];
    return follower; 
}