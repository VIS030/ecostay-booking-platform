import json
properties_db = json.loads(r'''[
    {
        "id": "1",
        "slug": "manali-eco-mountain-cabin-1",
        "title": "Pristine Mountain Cabin in Manali",
        "location": {
            "city": "Manali",
            "region": "Himachal Pradesh",
            "country": "India"
        },
        "price": 100,
        "currency": "USD",
        "rating": 4.6,
        "reviewCount": 22,
        "images": [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            "https://images.unsplash.com/photo-1542718610-a1d656a18855?w=800&q=80",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"
        ],
        "category": "Mountain Cabin",
        "propertyType": "Mountain Cabin",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Manali",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": false
        },
        "description": "Experience nature at its best in Manali, Himachal Pradesh. This premium mountain cabin features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "2",
        "slug": "manali-eco-forest-lodge-2",
        "title": "Sustainable Forest Lodge Retreat, Manali",
        "location": {
            "city": "Manali",
            "region": "Himachal Pradesh",
            "country": "India"
        },
        "price": 115,
        "currency": "USD",
        "rating": 4.7,
        "reviewCount": 29,
        "images": [
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80"
        ],
        "category": "Forest Lodge",
        "propertyType": "Forest Lodge",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Manali",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": false
        },
        "description": "Experience nature at its best in Manali, Himachal Pradesh. This premium forest lodge features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "3",
        "slug": "shimla-eco-mountain-cabin-1",
        "title": "Pristine Mountain Cabin in Shimla",
        "location": {
            "city": "Shimla",
            "region": "Himachal Pradesh",
            "country": "India"
        },
        "price": 130,
        "currency": "USD",
        "rating": 4.8,
        "reviewCount": 36,
        "images": [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            "https://images.unsplash.com/photo-1542718610-a1d656a18855?w=800&q=80",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"
        ],
        "category": "Mountain Cabin",
        "propertyType": "Mountain Cabin",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Shimla",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": true
        },
        "description": "Experience nature at its best in Shimla, Himachal Pradesh. This premium mountain cabin features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "4",
        "slug": "shimla-eco-eco-villa-2",
        "title": "Sustainable Eco Villa Retreat, Shimla",
        "location": {
            "city": "Shimla",
            "region": "Himachal Pradesh",
            "country": "India"
        },
        "price": 240,
        "currency": "USD",
        "rating": 4.9,
        "reviewCount": 43,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Shimla",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": false
        },
        "description": "Experience nature at its best in Shimla, Himachal Pradesh. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "5",
        "slug": "kasol-eco-glamping-tent-1",
        "title": "Pristine Glamping Tent in Kasol",
        "location": {
            "city": "Kasol",
            "region": "Himachal Pradesh",
            "country": "India"
        },
        "price": 95,
        "currency": "USD",
        "rating": 5.0,
        "reviewCount": 50,
        "images": [
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80"
        ],
        "category": "Glamping Tent",
        "propertyType": "Glamping Tent",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Kasol",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": false
        },
        "description": "Experience nature at its best in Kasol, Himachal Pradesh. This premium glamping tent features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "6",
        "slug": "kasol-eco-forest-lodge-2",
        "title": "Sustainable Forest Lodge Retreat, Kasol",
        "location": {
            "city": "Kasol",
            "region": "Himachal Pradesh",
            "country": "India"
        },
        "price": 100,
        "currency": "USD",
        "rating": 4.5,
        "reviewCount": 57,
        "images": [
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80"
        ],
        "category": "Forest Lodge",
        "propertyType": "Forest Lodge",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Kasol",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": true
        },
        "description": "Experience nature at its best in Kasol, Himachal Pradesh. This premium forest lodge features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "7",
        "slug": "dharamshala-eco-eco-villa-1",
        "title": "Pristine Eco Villa in Dharamshala",
        "location": {
            "city": "Dharamshala",
            "region": "Himachal Pradesh",
            "country": "India"
        },
        "price": 210,
        "currency": "USD",
        "rating": 4.6,
        "reviewCount": 64,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Dharamshala",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": false
        },
        "description": "Experience nature at its best in Dharamshala, Himachal Pradesh. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.5,
        "featured": true
    },
    {
        "id": "8",
        "slug": "dharamshala-eco-homestay-2",
        "title": "Sustainable Homestay Retreat, Dharamshala",
        "location": {
            "city": "Dharamshala",
            "region": "Himachal Pradesh",
            "country": "India"
        },
        "price": 100,
        "currency": "USD",
        "rating": 4.7,
        "reviewCount": 71,
        "images": [
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1528183429752-a97d0bf99404?w=800&q=80"
        ],
        "category": "Homestay",
        "propertyType": "Homestay",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Dharamshala",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": false
        },
        "description": "Experience nature at its best in Dharamshala, Himachal Pradesh. This premium homestay features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "9",
        "slug": "mcleod-ganj-eco-homestay-1",
        "title": "Pristine Homestay in McLeod Ganj",
        "location": {
            "city": "McLeod Ganj",
            "region": "Himachal Pradesh",
            "country": "India"
        },
        "price": 115,
        "currency": "USD",
        "rating": 4.8,
        "reviewCount": 78,
        "images": [
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1528183429752-a97d0bf99404?w=800&q=80"
        ],
        "category": "Homestay",
        "propertyType": "Homestay",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host McLeod Ganj",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": true
        },
        "description": "Experience nature at its best in McLeod Ganj, Himachal Pradesh. This premium homestay features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "10",
        "slug": "mcleod-ganj-eco-mountain-cabin-2",
        "title": "Sustainable Mountain Cabin Retreat, McLeod Ganj",
        "location": {
            "city": "McLeod Ganj",
            "region": "Himachal Pradesh",
            "country": "India"
        },
        "price": 85,
        "currency": "USD",
        "rating": 4.9,
        "reviewCount": 85,
        "images": [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            "https://images.unsplash.com/photo-1542718610-a1d656a18855?w=800&q=80",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"
        ],
        "category": "Mountain Cabin",
        "propertyType": "Mountain Cabin",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host McLeod Ganj",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": false
        },
        "description": "Experience nature at its best in McLeod Ganj, Himachal Pradesh. This premium mountain cabin features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "11",
        "slug": "leh-ladakh-eco-desert-camp-1",
        "title": "Pristine Desert Camp in Leh Ladakh",
        "location": {
            "city": "Leh Ladakh",
            "region": "Ladakh",
            "country": "India"
        },
        "price": 110,
        "currency": "USD",
        "rating": 5.0,
        "reviewCount": 92,
        "images": [
            "https://images.unsplash.com/photo-1509316781280-0255d2b4d8a8?w=800&q=80",
            "https://images.unsplash.com/photo-1451337516015-6b5e72a67289?w=800&q=80"
        ],
        "category": "Desert Camp",
        "propertyType": "Desert Camp",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Leh Ladakh",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": false
        },
        "description": "Experience nature at its best in Leh Ladakh, Ladakh. This premium desert camp features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "12",
        "slug": "leh-ladakh-eco-glamping-tent-2",
        "title": "Sustainable Glamping Tent Retreat, Leh Ladakh",
        "location": {
            "city": "Leh Ladakh",
            "region": "Ladakh",
            "country": "India"
        },
        "price": 125,
        "currency": "USD",
        "rating": 4.5,
        "reviewCount": 99,
        "images": [
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80"
        ],
        "category": "Glamping Tent",
        "propertyType": "Glamping Tent",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Leh Ladakh",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": true
        },
        "description": "Experience nature at its best in Leh Ladakh, Ladakh. This premium glamping tent features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "13",
        "slug": "srinagar-eco-eco-villa-1",
        "title": "Pristine Eco Villa in Srinagar",
        "location": {
            "city": "Srinagar",
            "region": "Jammu & Kashmir",
            "country": "India"
        },
        "price": 225,
        "currency": "USD",
        "rating": 4.6,
        "reviewCount": 106,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Srinagar",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": false
        },
        "description": "Experience nature at its best in Srinagar, Jammu & Kashmir. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "14",
        "slug": "srinagar-eco-homestay-2",
        "title": "Sustainable Homestay Retreat, Srinagar",
        "location": {
            "city": "Srinagar",
            "region": "Jammu & Kashmir",
            "country": "India"
        },
        "price": 115,
        "currency": "USD",
        "rating": 4.7,
        "reviewCount": 113,
        "images": [
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1528183429752-a97d0bf99404?w=800&q=80"
        ],
        "category": "Homestay",
        "propertyType": "Homestay",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Srinagar",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": false
        },
        "description": "Experience nature at its best in Srinagar, Jammu & Kashmir. This premium homestay features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.0,
        "featured": true
    },
    {
        "id": "15",
        "slug": "gulmarg-eco-mountain-cabin-1",
        "title": "Pristine Mountain Cabin in Gulmarg",
        "location": {
            "city": "Gulmarg",
            "region": "Jammu & Kashmir",
            "country": "India"
        },
        "price": 85,
        "currency": "USD",
        "rating": 4.8,
        "reviewCount": 120,
        "images": [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            "https://images.unsplash.com/photo-1542718610-a1d656a18855?w=800&q=80",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"
        ],
        "category": "Mountain Cabin",
        "propertyType": "Mountain Cabin",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Gulmarg",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": true
        },
        "description": "Experience nature at its best in Gulmarg, Jammu & Kashmir. This premium mountain cabin features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "16",
        "slug": "gulmarg-eco-forest-lodge-2",
        "title": "Sustainable Forest Lodge Retreat, Gulmarg",
        "location": {
            "city": "Gulmarg",
            "region": "Jammu & Kashmir",
            "country": "India"
        },
        "price": 100,
        "currency": "USD",
        "rating": 4.9,
        "reviewCount": 127,
        "images": [
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80"
        ],
        "category": "Forest Lodge",
        "propertyType": "Forest Lodge",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Gulmarg",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": false
        },
        "description": "Experience nature at its best in Gulmarg, Jammu & Kashmir. This premium forest lodge features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "17",
        "slug": "mussoorie-eco-eco-villa-1",
        "title": "Pristine Eco Villa in Mussoorie",
        "location": {
            "city": "Mussoorie",
            "region": "Uttarakhand",
            "country": "India"
        },
        "price": 210,
        "currency": "USD",
        "rating": 5.0,
        "reviewCount": 134,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Mussoorie",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": false
        },
        "description": "Experience nature at its best in Mussoorie, Uttarakhand. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "18",
        "slug": "mussoorie-eco-mountain-cabin-2",
        "title": "Sustainable Mountain Cabin Retreat, Mussoorie",
        "location": {
            "city": "Mussoorie",
            "region": "Uttarakhand",
            "country": "India"
        },
        "price": 130,
        "currency": "USD",
        "rating": 4.5,
        "reviewCount": 141,
        "images": [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            "https://images.unsplash.com/photo-1542718610-a1d656a18855?w=800&q=80",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"
        ],
        "category": "Mountain Cabin",
        "propertyType": "Mountain Cabin",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Mussoorie",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": true
        },
        "description": "Experience nature at its best in Mussoorie, Uttarakhand. This premium mountain cabin features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "19",
        "slug": "nainital-eco-forest-lodge-1",
        "title": "Pristine Forest Lodge in Nainital",
        "location": {
            "city": "Nainital",
            "region": "Uttarakhand",
            "country": "India"
        },
        "price": 145,
        "currency": "USD",
        "rating": 4.6,
        "reviewCount": 148,
        "images": [
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80"
        ],
        "category": "Forest Lodge",
        "propertyType": "Forest Lodge",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Nainital",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": false
        },
        "description": "Experience nature at its best in Nainital, Uttarakhand. This premium forest lodge features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "20",
        "slug": "nainital-eco-homestay-2",
        "title": "Sustainable Homestay Retreat, Nainital",
        "location": {
            "city": "Nainital",
            "region": "Uttarakhand",
            "country": "India"
        },
        "price": 55,
        "currency": "USD",
        "rating": 4.7,
        "reviewCount": 155,
        "images": [
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1528183429752-a97d0bf99404?w=800&q=80"
        ],
        "category": "Homestay",
        "propertyType": "Homestay",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Nainital",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": false
        },
        "description": "Experience nature at its best in Nainital, Uttarakhand. This premium homestay features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "21",
        "slug": "rishikesh-eco-glamping-tent-1",
        "title": "Pristine Glamping Tent in Rishikesh",
        "location": {
            "city": "Rishikesh",
            "region": "Uttarakhand",
            "country": "India"
        },
        "price": 110,
        "currency": "USD",
        "rating": 4.8,
        "reviewCount": 162,
        "images": [
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80"
        ],
        "category": "Glamping Tent",
        "propertyType": "Glamping Tent",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Rishikesh",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": true
        },
        "description": "Experience nature at its best in Rishikesh, Uttarakhand. This premium glamping tent features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.5,
        "featured": true
    },
    {
        "id": "22",
        "slug": "rishikesh-eco-eco-villa-2",
        "title": "Sustainable Eco Villa Retreat, Rishikesh",
        "location": {
            "city": "Rishikesh",
            "region": "Uttarakhand",
            "country": "India"
        },
        "price": 210,
        "currency": "USD",
        "rating": 4.9,
        "reviewCount": 169,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Rishikesh",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": false
        },
        "description": "Experience nature at its best in Rishikesh, Uttarakhand. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "23",
        "slug": "auli-eco-mountain-cabin-1",
        "title": "Pristine Mountain Cabin in Auli",
        "location": {
            "city": "Auli",
            "region": "Uttarakhand",
            "country": "India"
        },
        "price": 130,
        "currency": "USD",
        "rating": 5.0,
        "reviewCount": 176,
        "images": [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            "https://images.unsplash.com/photo-1542718610-a1d656a18855?w=800&q=80",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"
        ],
        "category": "Mountain Cabin",
        "propertyType": "Mountain Cabin",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Auli",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": false
        },
        "description": "Experience nature at its best in Auli, Uttarakhand. This premium mountain cabin features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "24",
        "slug": "auli-eco-glamping-tent-2",
        "title": "Sustainable Glamping Tent Retreat, Auli",
        "location": {
            "city": "Auli",
            "region": "Uttarakhand",
            "country": "India"
        },
        "price": 155,
        "currency": "USD",
        "rating": 4.5,
        "reviewCount": 183,
        "images": [
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80"
        ],
        "category": "Glamping Tent",
        "propertyType": "Glamping Tent",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Auli",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": true
        },
        "description": "Experience nature at its best in Auli, Uttarakhand. This premium glamping tent features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "25",
        "slug": "spiti-valley-eco-desert-camp-1",
        "title": "Pristine Desert Camp in Spiti Valley",
        "location": {
            "city": "Spiti Valley",
            "region": "Himachal Pradesh",
            "country": "India"
        },
        "price": 95,
        "currency": "USD",
        "rating": 4.6,
        "reviewCount": 190,
        "images": [
            "https://images.unsplash.com/photo-1509316781280-0255d2b4d8a8?w=800&q=80",
            "https://images.unsplash.com/photo-1451337516015-6b5e72a67289?w=800&q=80"
        ],
        "category": "Desert Camp",
        "propertyType": "Desert Camp",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Spiti Valley",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": false
        },
        "description": "Experience nature at its best in Spiti Valley, Himachal Pradesh. This premium desert camp features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "26",
        "slug": "spiti-valley-eco-mountain-cabin-2",
        "title": "Sustainable Mountain Cabin Retreat, Spiti Valley",
        "location": {
            "city": "Spiti Valley",
            "region": "Himachal Pradesh",
            "country": "India"
        },
        "price": 100,
        "currency": "USD",
        "rating": 4.7,
        "reviewCount": 197,
        "images": [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            "https://images.unsplash.com/photo-1542718610-a1d656a18855?w=800&q=80",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"
        ],
        "category": "Mountain Cabin",
        "propertyType": "Mountain Cabin",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Spiti Valley",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": false
        },
        "description": "Experience nature at its best in Spiti Valley, Himachal Pradesh. This premium mountain cabin features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "27",
        "slug": "jaipur-eco-eco-villa-1",
        "title": "Pristine Eco Villa in Jaipur",
        "location": {
            "city": "Jaipur",
            "region": "Rajasthan",
            "country": "India"
        },
        "price": 210,
        "currency": "USD",
        "rating": 4.8,
        "reviewCount": 204,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Jaipur",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": true
        },
        "description": "Experience nature at its best in Jaipur, Rajasthan. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "28",
        "slug": "jaipur-eco-homestay-2",
        "title": "Sustainable Homestay Retreat, Jaipur",
        "location": {
            "city": "Jaipur",
            "region": "Rajasthan",
            "country": "India"
        },
        "price": 100,
        "currency": "USD",
        "rating": 4.9,
        "reviewCount": 211,
        "images": [
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1528183429752-a97d0bf99404?w=800&q=80"
        ],
        "category": "Homestay",
        "propertyType": "Homestay",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Jaipur",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": false
        },
        "description": "Experience nature at its best in Jaipur, Rajasthan. This premium homestay features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.0,
        "featured": true
    },
    {
        "id": "29",
        "slug": "udaipur-eco-eco-villa-1",
        "title": "Pristine Eco Villa in Udaipur",
        "location": {
            "city": "Udaipur",
            "region": "Rajasthan",
            "country": "India"
        },
        "price": 240,
        "currency": "USD",
        "rating": 5.0,
        "reviewCount": 218,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Udaipur",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": false
        },
        "description": "Experience nature at its best in Udaipur, Rajasthan. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "30",
        "slug": "udaipur-eco-homestay-2",
        "title": "Sustainable Homestay Retreat, Udaipur",
        "location": {
            "city": "Udaipur",
            "region": "Rajasthan",
            "country": "India"
        },
        "price": 55,
        "currency": "USD",
        "rating": 4.5,
        "reviewCount": 225,
        "images": [
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1528183429752-a97d0bf99404?w=800&q=80"
        ],
        "category": "Homestay",
        "propertyType": "Homestay",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Udaipur",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": true
        },
        "description": "Experience nature at its best in Udaipur, Rajasthan. This premium homestay features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "31",
        "slug": "jaisalmer-eco-desert-camp-1",
        "title": "Pristine Desert Camp in Jaisalmer",
        "location": {
            "city": "Jaisalmer",
            "region": "Rajasthan",
            "country": "India"
        },
        "price": 110,
        "currency": "USD",
        "rating": 4.6,
        "reviewCount": 232,
        "images": [
            "https://images.unsplash.com/photo-1509316781280-0255d2b4d8a8?w=800&q=80",
            "https://images.unsplash.com/photo-1451337516015-6b5e72a67289?w=800&q=80"
        ],
        "category": "Desert Camp",
        "propertyType": "Desert Camp",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Jaisalmer",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": false
        },
        "description": "Experience nature at its best in Jaisalmer, Rajasthan. This premium desert camp features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "32",
        "slug": "jaisalmer-eco-glamping-tent-2",
        "title": "Sustainable Glamping Tent Retreat, Jaisalmer",
        "location": {
            "city": "Jaisalmer",
            "region": "Rajasthan",
            "country": "India"
        },
        "price": 125,
        "currency": "USD",
        "rating": 4.7,
        "reviewCount": 239,
        "images": [
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80"
        ],
        "category": "Glamping Tent",
        "propertyType": "Glamping Tent",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Jaisalmer",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": false
        },
        "description": "Experience nature at its best in Jaisalmer, Rajasthan. This premium glamping tent features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "33",
        "slug": "mount-abu-eco-forest-lodge-1",
        "title": "Pristine Forest Lodge in Mount Abu",
        "location": {
            "city": "Mount Abu",
            "region": "Rajasthan",
            "country": "India"
        },
        "price": 130,
        "currency": "USD",
        "rating": 4.8,
        "reviewCount": 246,
        "images": [
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80"
        ],
        "category": "Forest Lodge",
        "propertyType": "Forest Lodge",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Mount Abu",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": true
        },
        "description": "Experience nature at its best in Mount Abu, Rajasthan. This premium forest lodge features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "34",
        "slug": "mount-abu-eco-eco-villa-2",
        "title": "Sustainable Eco Villa Retreat, Mount Abu",
        "location": {
            "city": "Mount Abu",
            "region": "Rajasthan",
            "country": "India"
        },
        "price": 240,
        "currency": "USD",
        "rating": 4.9,
        "reviewCount": 253,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Mount Abu",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": false
        },
        "description": "Experience nature at its best in Mount Abu, Rajasthan. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "35",
        "slug": "goa-eco-beach-bungalow-1",
        "title": "Pristine Beach Bungalow in Goa",
        "location": {
            "city": "Goa",
            "region": "Goa",
            "country": "India"
        },
        "price": 85,
        "currency": "USD",
        "rating": 5.0,
        "reviewCount": 260,
        "images": [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"
        ],
        "category": "Beach Bungalow",
        "propertyType": "Beach Bungalow",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Goa",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": false
        },
        "description": "Experience nature at its best in Goa, Goa. This premium beach bungalow features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.5,
        "featured": true
    },
    {
        "id": "36",
        "slug": "goa-eco-eco-villa-2",
        "title": "Sustainable Eco Villa Retreat, Goa",
        "location": {
            "city": "Goa",
            "region": "Goa",
            "country": "India"
        },
        "price": 195,
        "currency": "USD",
        "rating": 4.5,
        "reviewCount": 17,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Goa",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": true
        },
        "description": "Experience nature at its best in Goa, Goa. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "37",
        "slug": "coorg-eco-forest-lodge-1",
        "title": "Pristine Forest Lodge in Coorg",
        "location": {
            "city": "Coorg",
            "region": "Karnataka",
            "country": "India"
        },
        "price": 115,
        "currency": "USD",
        "rating": 4.6,
        "reviewCount": 24,
        "images": [
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80"
        ],
        "category": "Forest Lodge",
        "propertyType": "Forest Lodge",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Coorg",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": false
        },
        "description": "Experience nature at its best in Coorg, Karnataka. This premium forest lodge features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "38",
        "slug": "coorg-eco-jungle-treehouse-2",
        "title": "Sustainable Jungle Treehouse Retreat, Coorg",
        "location": {
            "city": "Coorg",
            "region": "Karnataka",
            "country": "India"
        },
        "price": 185,
        "currency": "USD",
        "rating": 4.7,
        "reviewCount": 31,
        "images": [
            "https://images.unsplash.com/photo-1513836279014-a89e7a99ae05?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80"
        ],
        "category": "Jungle Treehouse",
        "propertyType": "Jungle Treehouse",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Coorg",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": false
        },
        "description": "Experience nature at its best in Coorg, Karnataka. This premium jungle treehouse features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "39",
        "slug": "ooty-eco-cottage-1",
        "title": "Pristine Cottage in Ooty",
        "location": {
            "city": "Ooty",
            "region": "Tamil Nadu",
            "country": "India"
        },
        "price": 145,
        "currency": "USD",
        "rating": 4.8,
        "reviewCount": 38,
        "images": [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            "https://images.unsplash.com/photo-1542718610-a1d656a18855?w=800&q=80"
        ],
        "category": "Cottage",
        "propertyType": "Cottage",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Ooty",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": true
        },
        "description": "Experience nature at its best in Ooty, Tamil Nadu. This premium cottage features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "40",
        "slug": "ooty-eco-mountain-cabin-2",
        "title": "Sustainable Mountain Cabin Retreat, Ooty",
        "location": {
            "city": "Ooty",
            "region": "Tamil Nadu",
            "country": "India"
        },
        "price": 85,
        "currency": "USD",
        "rating": 4.9,
        "reviewCount": 45,
        "images": [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            "https://images.unsplash.com/photo-1542718610-a1d656a18855?w=800&q=80",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"
        ],
        "category": "Mountain Cabin",
        "propertyType": "Mountain Cabin",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Ooty",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": false
        },
        "description": "Experience nature at its best in Ooty, Tamil Nadu. This premium mountain cabin features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "41",
        "slug": "munnar-eco-eco-villa-1",
        "title": "Pristine Eco Villa in Munnar",
        "location": {
            "city": "Munnar",
            "region": "Kerala",
            "country": "India"
        },
        "price": 195,
        "currency": "USD",
        "rating": 5.0,
        "reviewCount": 52,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Munnar",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": false
        },
        "description": "Experience nature at its best in Munnar, Kerala. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "42",
        "slug": "munnar-eco-jungle-treehouse-2",
        "title": "Sustainable Jungle Treehouse Retreat, Munnar",
        "location": {
            "city": "Munnar",
            "region": "Kerala",
            "country": "India"
        },
        "price": 170,
        "currency": "USD",
        "rating": 4.5,
        "reviewCount": 59,
        "images": [
            "https://images.unsplash.com/photo-1513836279014-a89e7a99ae05?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80"
        ],
        "category": "Jungle Treehouse",
        "propertyType": "Jungle Treehouse",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Munnar",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": true
        },
        "description": "Experience nature at its best in Munnar, Kerala. This premium jungle treehouse features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.0,
        "featured": true
    },
    {
        "id": "43",
        "slug": "wayanad-eco-jungle-treehouse-1",
        "title": "Pristine Jungle Treehouse in Wayanad",
        "location": {
            "city": "Wayanad",
            "region": "Kerala",
            "country": "India"
        },
        "price": 185,
        "currency": "USD",
        "rating": 4.6,
        "reviewCount": 66,
        "images": [
            "https://images.unsplash.com/photo-1513836279014-a89e7a99ae05?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80"
        ],
        "category": "Jungle Treehouse",
        "propertyType": "Jungle Treehouse",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Wayanad",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": false
        },
        "description": "Experience nature at its best in Wayanad, Kerala. This premium jungle treehouse features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "44",
        "slug": "wayanad-eco-forest-lodge-2",
        "title": "Sustainable Forest Lodge Retreat, Wayanad",
        "location": {
            "city": "Wayanad",
            "region": "Kerala",
            "country": "India"
        },
        "price": 145,
        "currency": "USD",
        "rating": 4.7,
        "reviewCount": 73,
        "images": [
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80"
        ],
        "category": "Forest Lodge",
        "propertyType": "Forest Lodge",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Wayanad",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": false
        },
        "description": "Experience nature at its best in Wayanad, Kerala. This premium forest lodge features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "45",
        "slug": "alleppey-eco-eco-villa-1",
        "title": "Pristine Eco Villa in Alleppey",
        "location": {
            "city": "Alleppey",
            "region": "Kerala",
            "country": "India"
        },
        "price": 180,
        "currency": "USD",
        "rating": 4.8,
        "reviewCount": 80,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Alleppey",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": true
        },
        "description": "Experience nature at its best in Alleppey, Kerala. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "46",
        "slug": "alleppey-eco-homestay-2",
        "title": "Sustainable Homestay Retreat, Alleppey",
        "location": {
            "city": "Alleppey",
            "region": "Kerala",
            "country": "India"
        },
        "price": 70,
        "currency": "USD",
        "rating": 4.9,
        "reviewCount": 87,
        "images": [
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1528183429752-a97d0bf99404?w=800&q=80"
        ],
        "category": "Homestay",
        "propertyType": "Homestay",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Alleppey",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": false
        },
        "description": "Experience nature at its best in Alleppey, Kerala. This premium homestay features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "47",
        "slug": "hampi-eco-homestay-1",
        "title": "Pristine Homestay in Hampi",
        "location": {
            "city": "Hampi",
            "region": "Karnataka",
            "country": "India"
        },
        "price": 85,
        "currency": "USD",
        "rating": 5.0,
        "reviewCount": 94,
        "images": [
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1528183429752-a97d0bf99404?w=800&q=80"
        ],
        "category": "Homestay",
        "propertyType": "Homestay",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Hampi",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": false
        },
        "description": "Experience nature at its best in Hampi, Karnataka. This premium homestay features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "48",
        "slug": "hampi-eco-glamping-tent-2",
        "title": "Sustainable Glamping Tent Retreat, Hampi",
        "location": {
            "city": "Hampi",
            "region": "Karnataka",
            "country": "India"
        },
        "price": 140,
        "currency": "USD",
        "rating": 4.5,
        "reviewCount": 101,
        "images": [
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80"
        ],
        "category": "Glamping Tent",
        "propertyType": "Glamping Tent",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Hampi",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": true
        },
        "description": "Experience nature at its best in Hampi, Karnataka. This premium glamping tent features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "49",
        "slug": "mysore-eco-eco-villa-1",
        "title": "Pristine Eco Villa in Mysore",
        "location": {
            "city": "Mysore",
            "region": "Karnataka",
            "country": "India"
        },
        "price": 240,
        "currency": "USD",
        "rating": 4.6,
        "reviewCount": 108,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Mysore",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": false
        },
        "description": "Experience nature at its best in Mysore, Karnataka. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.5,
        "featured": true
    },
    {
        "id": "50",
        "slug": "mysore-eco-homestay-2",
        "title": "Sustainable Homestay Retreat, Mysore",
        "location": {
            "city": "Mysore",
            "region": "Karnataka",
            "country": "India"
        },
        "price": 55,
        "currency": "USD",
        "rating": 4.7,
        "reviewCount": 115,
        "images": [
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1528183429752-a97d0bf99404?w=800&q=80"
        ],
        "category": "Homestay",
        "propertyType": "Homestay",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Mysore",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": false
        },
        "description": "Experience nature at its best in Mysore, Karnataka. This premium homestay features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "51",
        "slug": "pondicherry-eco-beach-bungalow-1",
        "title": "Pristine Beach Bungalow in Pondicherry",
        "location": {
            "city": "Pondicherry",
            "region": "Puducherry",
            "country": "India"
        },
        "price": 100,
        "currency": "USD",
        "rating": 4.8,
        "reviewCount": 122,
        "images": [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"
        ],
        "category": "Beach Bungalow",
        "propertyType": "Beach Bungalow",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Pondicherry",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": true
        },
        "description": "Experience nature at its best in Pondicherry, Puducherry. This premium beach bungalow features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "52",
        "slug": "pondicherry-eco-eco-villa-2",
        "title": "Sustainable Eco Villa Retreat, Pondicherry",
        "location": {
            "city": "Pondicherry",
            "region": "Puducherry",
            "country": "India"
        },
        "price": 210,
        "currency": "USD",
        "rating": 4.9,
        "reviewCount": 129,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Pondicherry",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": false
        },
        "description": "Experience nature at its best in Pondicherry, Puducherry. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "53",
        "slug": "andaman-eco-beach-bungalow-1",
        "title": "Pristine Beach Bungalow in Andaman",
        "location": {
            "city": "Andaman",
            "region": "Andaman & Nicobar",
            "country": "India"
        },
        "price": 130,
        "currency": "USD",
        "rating": 5.0,
        "reviewCount": 136,
        "images": [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"
        ],
        "category": "Beach Bungalow",
        "propertyType": "Beach Bungalow",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Andaman",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": false
        },
        "description": "Experience nature at its best in Andaman, Andaman & Nicobar. This premium beach bungalow features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "54",
        "slug": "andaman-eco-jungle-treehouse-2",
        "title": "Sustainable Jungle Treehouse Retreat, Andaman",
        "location": {
            "city": "Andaman",
            "region": "Andaman & Nicobar",
            "country": "India"
        },
        "price": 200,
        "currency": "USD",
        "rating": 4.5,
        "reviewCount": 143,
        "images": [
            "https://images.unsplash.com/photo-1513836279014-a89e7a99ae05?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80"
        ],
        "category": "Jungle Treehouse",
        "propertyType": "Jungle Treehouse",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Andaman",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": true
        },
        "description": "Experience nature at its best in Andaman, Andaman & Nicobar. This premium jungle treehouse features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "55",
        "slug": "darjeeling-eco-mountain-cabin-1",
        "title": "Pristine Mountain Cabin in Darjeeling",
        "location": {
            "city": "Darjeeling",
            "region": "West Bengal",
            "country": "India"
        },
        "price": 85,
        "currency": "USD",
        "rating": 4.6,
        "reviewCount": 150,
        "images": [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            "https://images.unsplash.com/photo-1542718610-a1d656a18855?w=800&q=80",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"
        ],
        "category": "Mountain Cabin",
        "propertyType": "Mountain Cabin",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Darjeeling",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": false
        },
        "description": "Experience nature at its best in Darjeeling, West Bengal. This premium mountain cabin features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "56",
        "slug": "darjeeling-eco-homestay-2",
        "title": "Sustainable Homestay Retreat, Darjeeling",
        "location": {
            "city": "Darjeeling",
            "region": "West Bengal",
            "country": "India"
        },
        "price": 70,
        "currency": "USD",
        "rating": 4.7,
        "reviewCount": 157,
        "images": [
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
            "https://images.unsplash.com/photo-1528183429752-a97d0bf99404?w=800&q=80"
        ],
        "category": "Homestay",
        "propertyType": "Homestay",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Darjeeling",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": false
        },
        "description": "Experience nature at its best in Darjeeling, West Bengal. This premium homestay features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.0,
        "featured": true
    },
    {
        "id": "57",
        "slug": "gangtok-eco-mountain-cabin-1",
        "title": "Pristine Mountain Cabin in Gangtok",
        "location": {
            "city": "Gangtok",
            "region": "Sikkim",
            "country": "India"
        },
        "price": 115,
        "currency": "USD",
        "rating": 4.8,
        "reviewCount": 164,
        "images": [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            "https://images.unsplash.com/photo-1542718610-a1d656a18855?w=800&q=80",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"
        ],
        "category": "Mountain Cabin",
        "propertyType": "Mountain Cabin",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Gangtok",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": true
        },
        "description": "Experience nature at its best in Gangtok, Sikkim. This premium mountain cabin features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "58",
        "slug": "gangtok-eco-eco-villa-2",
        "title": "Sustainable Eco Villa Retreat, Gangtok",
        "location": {
            "city": "Gangtok",
            "region": "Sikkim",
            "country": "India"
        },
        "price": 225,
        "currency": "USD",
        "rating": 4.9,
        "reviewCount": 171,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Gangtok",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": false
        },
        "description": "Experience nature at its best in Gangtok, Sikkim. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "59",
        "slug": "kaziranga-eco-jungle-treehouse-1",
        "title": "Pristine Jungle Treehouse in Kaziranga",
        "location": {
            "city": "Kaziranga",
            "region": "Assam",
            "country": "India"
        },
        "price": 200,
        "currency": "USD",
        "rating": 5.0,
        "reviewCount": 178,
        "images": [
            "https://images.unsplash.com/photo-1513836279014-a89e7a99ae05?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80"
        ],
        "category": "Jungle Treehouse",
        "propertyType": "Jungle Treehouse",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Kaziranga",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2023,
            "superhost": false
        },
        "description": "Experience nature at its best in Kaziranga, Assam. This premium jungle treehouse features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "60",
        "slug": "kaziranga-eco-forest-lodge-2",
        "title": "Sustainable Forest Lodge Retreat, Kaziranga",
        "location": {
            "city": "Kaziranga",
            "region": "Assam",
            "country": "India"
        },
        "price": 85,
        "currency": "USD",
        "rating": 4.5,
        "reviewCount": 185,
        "images": [
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80"
        ],
        "category": "Forest Lodge",
        "propertyType": "Forest Lodge",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Kaziranga",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2020,
            "superhost": true
        },
        "description": "Experience nature at its best in Kaziranga, Assam. This premium forest lodge features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1.0,
        "featured": false
    },
    {
        "id": "61",
        "slug": "shillong-eco-forest-lodge-1",
        "title": "Pristine Forest Lodge in Shillong",
        "location": {
            "city": "Shillong",
            "region": "Meghalaya",
            "country": "India"
        },
        "price": 100,
        "currency": "USD",
        "rating": 4.6,
        "reviewCount": 192,
        "images": [
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80"
        ],
        "category": "Forest Lodge",
        "propertyType": "Forest Lodge",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Mountain View",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Shillong",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2021,
            "superhost": false
        },
        "description": "Experience nature at its best in Shillong, Meghalaya. This premium forest lodge features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 4,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 1.5,
        "featured": false
    },
    {
        "id": "62",
        "slug": "shillong-eco-eco-villa-2",
        "title": "Sustainable Eco Villa Retreat, Shillong",
        "location": {
            "city": "Shillong",
            "region": "Meghalaya",
            "country": "India"
        },
        "price": 210,
        "currency": "USD",
        "rating": 4.7,
        "reviewCount": 199,
        "images": [
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        "category": "Eco Villa",
        "propertyType": "Eco Villa",
        "amenities": [
            "WiFi",
            "Solar Power",
            "Organic Breakfast",
            "Rainwater Harvesting",
            "Kitchen"
        ],
        "ecoFeatures": [
            "Solar panels",
            "Zero single-use plastics",
            "Water conservation program"
        ],
        "host": {
            "name": "Host Shillong",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            "joinedYear": 2022,
            "superhost": false
        },
        "description": "Experience nature at its best in Shillong, Meghalaya. This premium eco villa features complete solar power generation, organic farm-to-table dining options, and zero plastic waste operations. Nestled in a quiet green pocket, it offers the perfect conscious getaway with stunning views and modern comforts.",
        "maxGuests": 6,
        "bedrooms": 3,
        "beds": 5,
        "bathrooms": 1.0,
        "featured": false
    }
]''')
