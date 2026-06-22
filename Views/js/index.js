const messageUpdate = () => {
    const messageElemnt = document.getElementById("header-title");
    const now = new Date();
    const hour = now.getHours();
    let text = "";

    if (hour >= 5 && hour <= 12) {
        text = "Good morning";
    }
    else if (hour >= 12 && hour <= 17) {
        text = "Good afternoon";
    }
    else if (hour >= 17 && hour <= 22) {
        text = "Good evening";
    }
    else {
        text = "Good night";
    }

    messageElemnt.textContent = text;
};

document.addEventListener("DOMContentLoaded", () => {
    messageUpdate();
    loadAdminSongs();
});


const SUPABASE_URL = "https://jxyyvqkmyeythspvnwid.supabase.co";
const SUPABASE_KEY = "sb_publishable_Qlw9rzbRm6VhDHmIk3SzUA_uxSpO6sf";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function loadAdminSongs() {

    const container = document.getElementById("admin-songs-list");

    const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

    if (error) {
        container.innerHTML = "<p>Failed to load songs</p>";
        console.error(error);
        return;
    }

    container.innerHTML = "";

    data.forEach(song => {

        container.innerHTML += `
            <div class="admin-song-card">

                <div class="admin-song-left">

                    <img
                        class="admin-song-cover"
                        src="${song.cover_url}"
                        alt="${song.title}"
                    >

                    <div class="admin-song-info">
                        <h3>${song.title}</h3>
                        <p>${song.artist}</p>
                    </div>

                </div>

                <div class="admin-song-btn">
                    <audio controls>
                        <source src="${song.audio_url}">
                    </audio>
                </div>

            </div>
        `;
    });
}