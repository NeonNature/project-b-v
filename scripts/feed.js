let postList = document.getElementById("feed-list");
const sortEl = document.getElementById("select-sort");
const filterEl = document.getElementById("select-filter");
let initialPosts = []; // used for resetting
let posts = []; // for display

const getUsers = (data) => {
    let uniqueSet = [...new Set(data.map((i) => i.userId))];
    uniqueSet.forEach((i) => filterEl.add(new Option(i, i)));
};

const getPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => {
            posts = data;
            initialPosts = data;
            renderPosts(data);
            getUsers(data);
        })
        .catch((err) => {
            console.log("Something went wrong while fetching posts", err);
        });
};

const renderPosts = (data) => {
    posts = data;
    let listHTML = "";
    for (var i = 0; i < data.length; i++) {
        listHTML += ` <div class="post-container">
                            <p class="post-title">${data[i].title}</p>
                            <p class="post-body">${data[i].body}</p>
                            <p class="post-user">User#${data[i].userId}</p>
                        </div>`;
    }
    postList.innerHTML = listHTML;
};

const sortPosts = () => {
    let rawData = [...posts];
    switch (sortEl.value) {
        case "ASCENDING":
            rawData.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "DESCENDING":
            rawData.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            rawData.sort((a, b) => a.id - b.id);
            break;
    }
    renderPosts(rawData);
};

const filterPosts = () => {
    if (filterEl.value >= 0) {
        let rawData = [...initialPosts];
        renderPosts(rawData.filter((i) => i.userId == filterEl.value));
    } else {
        renderPosts(initialPosts);
    }
    sortPosts();
};

sortEl.addEventListener("change", () => sortPosts());
filterEl.addEventListener("change", () => filterPosts());

document.addEventListener("DOMContentLoaded", () => getPosts());
