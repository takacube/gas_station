function myFunction() {
    const twitter_follower = count_follower_of_twitter();
    Logger.log(twitter_follower);
}

function count_follower_of_twitter() {
    const url = "https://api.twitter.com/2/users/by/username/taka55143344?user.fields=public_metrics";
    const options = {
        "method": "get",
        "headers": {
        "authorization": "Bearer [ここに自身のBearer tokenを入れる]"
        },
    };
    const response = JSON.parse(UrlFetchApp.fetch(url, options));
    Logger.log(response);
    let follower = response["data"]["public_metrics"]["followers_count"];
    return follower; 
}