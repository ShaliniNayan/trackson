const fs = require('fs');
const path = require('path');
const https = require('https');

const imgDir = path.join(__dirname, 'img');

// List of real HD sportswear photography URLs from Unsplash (free commercial license)
const photos = {
    // Men's Collection
    'men_badminton_polo.jpg': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80', // Badminton player in jersey
    'men_cricket_jersey.jpg': 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80', // Cricket / sports jersey
    'men_basketball_jersey.jpg': 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80', // Basketball mesh jersey
    'men_football_jersey.jpg': 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80', // Soccer / football kit
    'men_tracksuit.jpg': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', // Full athletic tracksuit

    // Women's Collection (Modest sportswear: Polos, Match Jerseys, Tracksuits, Shorts)
    'women_badminton_polo.jpg': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80', // Women's athletic polo
    'women_cricket_jersey.jpg': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80', // Women's match jersey
    'women_basketball_tee.jpg': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', // Women's sport tee
    'women_football_jersey.jpg': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', // Women's football jersey
    'women_tracksuit.jpg': 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80', // Women's full tracksuit
    'women_shorts.jpg': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', // Women's sport shorts

    // Kids' Collection
    'kids_badminton_tee.jpg': 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80', // Kids sport tee
    'kids_cricket_jersey.jpg': 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80', // Kids junior match jersey
    'kids_basketball_jersey.jpg': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80', // Kids basketball jersey
    'kids_football_jersey.jpg': 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80', // Kids soccer jersey
    'kids_tracksuit.jpg': 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=800&q=80', // Kids tracksuit
    'kids_shorts.jpg': 'https://images.unsplash.com/photo-1508215885820-4585e56135c8?auto=format&fit=crop&w=800&q=80' // Kids athletic shorts
};

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Follow redirect
                downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: status ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve());
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

async function run() {
    console.log('Downloading high-definition studio photos for sportswear...');
    for (const [filename, url] of Object.entries(photos)) {
        const dest = path.join(imgDir, filename);
        try {
            await downloadImage(url, dest);
            console.log(`Successfully downloaded HD photo: ${filename}`);
        } catch (e) {
            console.error(`Error downloading ${filename}: ${e.message}`);
        }
    }
    console.log('Done downloading all HD sportswear photos!');
}

run();
