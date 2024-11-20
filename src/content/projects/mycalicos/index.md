---
title: "my calicos"
description: "Collector's app for calico crittter figurines"
date: "Aug 2024"
imageUrl: "https://raw.githubusercontent.com/cyrusmcc/icdtea-imgs/refs/heads/main/cyrusmcc/projects/banners/misternuris.png"
demoURL: ""
---

'my calicos' is a wiki & collection app for fans of the popular figurine line known as 'Calico Critters' (US), 'Sylvanian Families' (JP/UK), or 'Ternurines' (MX). 

Built with React Native & Expo, 'my calicos' is availble for devices on both IOS and android. Users can register an account or browse as a guest, search & sort through hundreds of unique figurines, upload photos, interact with the community, and maintain their collections! The app features a stylized user UI designed with the franchise in mind, and is implemented on the frontend with React Native Reusable Component (think ShadCN) + Tailwind. Localizations/translations are in place for English & Spanish 
speaking countries.

<img src="https://raw.githubusercontent.com/cyrusmcc/icdtea-imgs/refs/heads/main/cyrusmcc/projects/misternuris/Group%20608.png" />


The backend is provided by Pocketbase, an SQLite based BAAS, allowing for the focus to be shifted to quick feature iteration. A data scraping script is used to do an initial population of the database with figurines, special edition sets, and scheduled to pull new releases from the community wiki as they are added. The frontend uses TanStack Query for the management of API calls & client side caching.

<img src="https://raw.githubusercontent.com/cyrusmcc/icdtea-imgs/refs/heads/main/cyrusmcc/projects/misternuris/Group%20612.png" />