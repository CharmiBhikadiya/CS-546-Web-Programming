var aboutmyself = {
    name: "Charmi Bhikadiya",
    biography: " My name is Charmi Bhikadiya,currently pursuing my Master of Science in Computer Science. I will be graduating in this December.\n I am looking for internship in the field of Computer Science. \n I have completed my Bachelor of Engineering in Computer Engineering at Gujarat Technological University.",
    favoriteShows: ["Legends of Tomorrow", "The Big Bang Theory", "Coffee With Karan", "Narcos"],
    hobbies: ["Travelling", "Climbing", "Sketing"]

};

var aboutmyeducation = 

    [{
      schoolName: " My first school name is P. P. Savani School",
      degree: "I studied in this school up to 12 standards",
      favoriteClass: "My favourite class is Maths" ,
      favoriteMemory: "I was a national level sketing champion."
    },
    {
      schoolName: "My second school name is Gujarat Technological University",
      degree: "I have completed my Bachelor of Engineering in Computer Engineering",
      favoriteClass: "Favourite Class is Database Management System",
      favoriteMemory: "I have completed my Bachelor of Engineering with the first class in Univeristy."
    },
    {
      schoolName: "My third school name is Stevens Institute of Technology.",
      degree: "I am pursuing MS in Computer Science",
      favoriteClass: "My Favourite class is Web Programming",
      favoriteMemory: "This is an international learning, experiencing for the first time in my life. The best memory I am taking with me is experience to learn to be independent and to mix with the different culture of people."
    }];

    var aboutmystory = {
        storyTitle: "I Always Keep a Smile on My Face",
        story: "I am a person who always has a smile on my face. I don't like to be sad or be dull at any given point of time. Whenever I come across any difficulties in my life I get depressed for a few minutes as I am a human being and I too have emotions. But again, I will tell one thing to myself life is short you can't waste time by being sad just cheer up. You are the one who needs to face the challenge whatever it is you have to overcome this situation. Be brave and accept the challenge with a smile and then you will feel it was such a small hurdle."
       
    };

let exportedMethod = {
    getmyself(){
        return aboutmyself;
    },
    
    getmyeducation()
    {
        return aboutmyeducation;
    },
    getmystory()
    {
        return aboutmystory;
    }

};

module.exports = exportedMethod;