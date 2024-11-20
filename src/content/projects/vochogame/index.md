---
title: "Vocho Game"
description: "Mobile 'treasure hunting' esque game"
date: "Nov 2024"
imageUrl: "https://raw.githubusercontent.com/cyrusmcc/icdtea-imgs/refs/heads/main/cyrusmcc/projects/banners/vochogame.png"
demoURL: ""
---

Vocho Game is "treasure hunting" esque game, involving the search and logging of "Vochos", as VW Beetles are colloquially known as in Mexico. Vocho Game utilizes the Google & Apple map APIs alongside React Native Map library to plot sightings called "spots", on an interactive map. As users come across Vochos, they can utilize the in-game photo taking system to spot a vocho and add information such as color or license number which helps build their in-game collection. Leaderboards, a leveling system, and user profile with a detailed stat breakdown are some of the ways the spotting system has been gamified.  

Built with React Native & Expo, 'Vocho Game' is available for devices on both IOS and android. The app features a stylized user UI designed with the franchise in mind, and is implemented on the frontend with React Native Reusable Component (think ShadCN) + Tailwind. Localizations/translations are in place for English & Spanish speaking countries.

The backend is provided by Pocketbase, an SQLite based BAAS, allowing for the focus to be shifted to quick feature iteration. The frontend uses TanStack Query for the management of API calls & client side caching.
