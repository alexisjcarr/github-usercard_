/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const placeholder = document.querySelector(".cards");

const userInfo = axios
  .get("https://api.github.com/users/alexisjcarr")
  .then(res => {
    //console.log(res.data);
    placeholder.appendChild(githubCardCreator(res.data));
  })
  .catch(err => {
    console.log(err);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = axios
  .get("https://api.github.com/users/alexisjcarr/followers")
  .then(res => {
    //console.log(res.data);
    res.data.forEach(follower =>
      axios
        .get(`https://api.github.com/users/${follower.login}`)
        .then(res => {
          placeholder.appendChild(githubCardCreator(res.data));
        })
        .catch(err => console.log(err))
    );
  })
  .catch(err => console.log(err));

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function githubCardCreator(dataObj) {
  const {
    avatar_url,
    name,
    login,
    location,
    html_url,
    followers,
    following,
    bio
  } = dataObj;

  const card = document.createElement("div");
  const avatar = document.createElement("img");
  const card_info = document.createElement("div");
  const usersName = document.createElement("h3");
  const username = document.createElement("p");
  const userLoc = document.createElement("p");
  const profile = document.createElement("p");
  const githubAddress = document.createElement("a");
  const githubFollowers = document.createElement("p");
  const githubFollowing = document.createElement("p");
  const userBio = document.createElement("p");
  const calendarDiv = document.createElement("div");
  const break_ = document.createElement("br");

  card.appendChild(avatar);
  card.appendChild(card_info);
  card_info.appendChild(usersName);
  card_info.appendChild(username);
  card_info.appendChild(userLoc);
  card_info.appendChild(profile);
  profile.appendChild(githubAddress);
  card_info.appendChild(githubFollowers);
  card_info.appendChild(githubFollowing);
  card_info.appendChild(userBio);
  card_info.appendChild(break_);
  card_info.appendChild(calendarDiv);

  card.classList.add("card");
  card_info.classList.add("card-info");
  usersName.classList.add("name");
  username.classList.add("username");
  calendarDiv.classList.add("calendar");

  avatar.setAttribute("src", avatar_url);
  usersName.textContent = name;
  username.textContent = login;
  userLoc.textContent = location;
  githubAddress.setAttribute("href", html_url);
  githubAddress.textContent = html_url;
  githubFollowers.textContent = `Followers: ${followers}`;
  githubFollowing.textContent = `Following: ${following}`;
  userBio.textContent = bio;
  new GitHubCalendar(calendarDiv, login);

  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
