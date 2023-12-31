# YT-update-video-title
##### Update video title with SyncLoop
##### track : API Integration Showcase 
---
# Introduction
This project is inspired by YouTubers like Tom Scott and Mr. Beast, who frequently update the title, thumbnail, and other attributes of their YouTube videos to engage their audience. With this web application, you can easily update the title of the last uploaded video in a YouTube playlist to display the number of views it has received.

### Why Use a Playlist?
Playlists are a convenient way to organize and manage videos on YouTube. By putting videos of the same type in a playlist, you can efficiently change the titles of these videos, ensuring consistency and making it easier for viewers to find content they are interested in.

### How It Works
- Step 1: Find the Playlist ID
To use this application, you need to know the Playlist ID of the YouTube playlist you want to work with. You can easily find this ID when you open the playlist in a web browser. The URL will look something like this:

https://www.youtube.com/playlist?list=XXXplaylistIdXXX

- Step 2: Update the Title without any delay
The application will automatically select the last video added to the playlist. It will then update the title of this video to display the number of views it has received. For example, it will change the title to "This Video Has n Views," where n represents the actual view count.

### How to Use
- Obtain the Playlist ID of the desired YouTube playlist.
- Use the application to update the title of the last video in the playlist.
- The title will be automatically changed to "This Video Has n Views."

## syncloop Integration
syncloop is used to layout API flow which is used in application internally.

It consist of 3 main steps:

- Fetch videoId of last video uploaded in playlist using playlistId.
- Fetch details of videoId like title, description, categoryid, tags, viewcount.
- Update title of the video.

You can watch the demo video on YouTube:

[![Watch the demo video](https://img.youtube.com/vi/8_jg5RIKVbA/0.jpg)](https://www.youtube.com/watch?v=8_jg5RIKVbA)
