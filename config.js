var doIt = false;
var config = {
    style: 'mapbox://styles/branigan/cjz37rcb003ib1cr3s8rnkt2d',
    accessToken: 'pk.eyJ1IjoibWJ4c29sdXRpb25zIiwiYSI6ImNrMm01aG9hdTBlZGwzbXQ1ZXVrNHNmejAifQ.QHQA0N6XPWddCXtvoODHZg',
    showMarkers: false,
    theme: 'dark',
    use3dTerrain: true,
    title: 'Injustice in the Air',
    subtitle: 'The Story Behind Houston\'s Nitrogen Dioxide Inequality',
    byline: '',
    footer: '<h3>Attributions</h3><p style="text-align: left; padding-left: 60px;">Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.</br>Story References: <a href="https://www.epa.gov/no2-pollution/basic-information-about-no2#:~:text=Nitrogen%20Dioxide%20(NO2)%20is,from%20the%20burning%20of%20fuel.">EPA</a></br>Image Sources: <a href="https://environmentalintegrity.org/wp-content/uploads/2019/09/Houston_industrial_crop.jpg">Environmental Integrity</a>, <a href="https://www.houstonchronicle.com/business/energy/article/Enterprise-to-expand-exports-as-profits-double-14271613.php">Enterprise Products Partners L.P.</a></p>',
    chapters: [
        {
            id: 'houstonShipChannelBigPhoto',
            alignment: 'full',
            title: 'Houston, Texas',
            image: 'https://environmentalintegrity.org/wp-content/uploads/2019/09/Houston_industrial_crop.jpg',
            description: 'The energy industry plays a primary role in Houston\'s economy.',
            location: {
                center: [29.749907, -95.358421],
                zoom: 8,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'gnpglaciers-1998',
                    opacity: 0.25
                },
                {
                    layer: 'glaciernp-boundary',
                    opacity: 0.25
                }
            ],
            onChapterExit: [
                {
                    layer: 'glaciernp-boundary',
                    opacity: 0
                }
            ]
        },
        {
            id: 'no2basics',
            alignment: 'center',
            title: '',
            image: '',
            description: '<h2>What is nitrogen dioxide?</h2><p>Nitrogen dioxide is a gaseous air pollutant. It comes from the burning of fossil fuels.</br></br><b>Common sources of nitrogen dioxide</b></br><ul><li>Cars, trucks, and buses</li><li>Power plants</li><li>Industrial sources</li><li>Off-road equipment (e.g. construction vehicles, lawn and garden equipment)</li></ul></br><a href="https://www.epa.gov/no2-pollution/basic-information-about-no2#What%20is%20NO2" target="_blank" rel="noopener noreferrer">Learn more about nitrogen dioxide</a></p>',
            location: {
                center: [29.749907, -95.358421],
                zoom: 8,//12.92,
                pitch: 0.00,//39.50,
                bearing: 0.00//36.00
            },
            onChapterEnter: [],
            onChapterExit: [
                // {
                //     layer: 'gnpglaciers-2015',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'welcomeToHouston',
            alignment: 'center',
            title: '',
            image: '',
            description: '<p>On average, Houston’s low-income residents and residents of color experience 30% higher burdens of nitrogen dioxide (NO<sub>2</sub>).</p>',
            location: {
                center: [29.749907, -95.358421],
                zoom: 11,//12.92,
                pitch: 0.00,//39.50,
                bearing: 0.00//36.00
            },
            onChapterEnter: [],
            onChapterExit: [
                // {
                //     layer: 'gnpglaciers-2015',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'houstonShipChannel',
            alignment: 'right',
            title: '',
            image: 'https://s.hdnux.com/photos/74/11/13/15766225/25/rawImage.jpg',
            description: '<h2>The Houston Ship Channel</h2></br>The Houston Ship Channel, in Houston, Texas, is part of the Port of Houston, one of the busiest seaports in the world.',
            location: {
                center: [29.7148474770, -95.2445839003227],
                zoom: 13,//12.92,
                pitch: 0.00,//39.50,
                bearing: 0.00//36.00
            },
            onChapterEnter: [],
            onChapterExit: [
                // {
                //     layer: 'gnpglaciers-2015',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'sources1',
            alignment: 'left',
            title: '',
            image: '',
            description: '<h2>Where Nitrogen Oxides Come From</h2><p>The Houston Ship Channel is lined with sources of nitrogen oxides (NO<sub>x</sub>), a group of gases that includes NO<sub>2</sub>. NO<sub>2</sub> usually gets in the air from the burning of fuel.</br></br>Click on each source to learn more.</p>',
            location: {
                center: [29.7148474770, -95.2445839003227],
                zoom: 13,//12.92,
                pitch: 0.00,//39.50,
                bearing: 0.00//36.00
            },
            onChapterEnter: [
            ],
            onChapterExit: [
                // {
                //     layer: 'gnpglaciers-2015',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'no2Chor',
            alignment: 'left',
            title: '',
            image: '',
            description: '<h2>Where Nitrogen Dioxide Ends Up</h2><p>It\'s no surprise that census tracts closer to the Houston Ship Channel have higher levels of NO<sub>2</sub>.</br></br>Maps like this one are useful tools in understanding where NO<sub>2</sub> comes from and where it ends up, but most fail to answer a crucial question:</p></br><h3 class="emphasis">WHO DOES IT IMPACT?</h3>',
            location: {
                center: [29.7148474770, -95.2445839003227],
                zoom: 13,//12.92,
                pitch: 0.00,//39.50,
                bearing: 0.00//36.00
            },
            onChapterEnter: [
            ],
            onChapterExit: [
                // {
                //     layer: 'gnpglaciers-2015',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'bivChor',
            alignment: 'right',
            title: '',
            image: '',
            description: '<h2>Who Nitrogen Dioxide Impacts</h2><p>This map combines the same NO<sub>2</sub> density data with socio-demographic factors.</p>',
            location: {
                center: [29.7148474770, -95.2445839003227],
                zoom: 13,//12.92,
                pitch: 0.00,//39.50,
                bearing: 0.00//36.00
            },
            onChapterEnter: [
            ],
            onChapterExit: [
                // {
                //     layer: 'gnpglaciers-2015',
                //     opacity: 0
                // }
            ]
        }
    ]
}
