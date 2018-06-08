alert("Hello Salvador");

var JohnAge = 25;
var FriendAge = 28;

var JohnHeight = 1.77;
var FriendHeight = 1.70;

var JohnScore = JohnHeight + 5*JohnAge;
var FriendScore = FriendHeight + 5*FriendAge;

if (JohnScore > FriendScore){

    console.log('John wins!');

}else if (JohnScore < FriendScore){
    console.log('Friend wins!');

} else {
    console.log('Draw.');
}