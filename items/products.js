export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

export const products = [{

  id: '2025001',
  image: 'images/crabbykeychain.jpg',
  name: 'Crab Keychain',
  ratings: {
    stars: 4.5,
    score: 4.5
  },
  priceCents: 25000
}, {
  id: '2025002',
  image: 'images/octokeychains.jpg',
  name: 'Octopus Keychain',
  ratings: {
    stars: 4.5,
    score: 4.5
  },
  priceCents: 25000
}, {
  id: '2025003',
  image: 'images/whalekeychain.jpg',
  name: 'Orca Keychain',
  ratings: {
    stars: 4.5,
    score: 4.5
  },
  priceCents: 25000
}, {
  id: '2025004',
  image: 'images/turtlekeychain (1).jpg',
  name: 'Turtle Keychain',
  ratings: {
    stars: 4.5,
    score: 4.5
  },
  priceCents: 25000
}, {
  id: '2025005',
  image: 'images/download (1).png',
  name: 'Blue Whale Keychain',
  ratings: {
    stars: 4.5,
    score: 4.5
  },
  priceCents: 25000
}, {
  id: '2025006',
  image: 'images/smolewhalekeychainpink.jpg',
  name: 'Pink Whale Keychain',
  ratings: {
    stars: 4.5,
    score: 4.5
  },
  priceCents: 25000
}, {
  id: '2025007',
  image: 'images/download.png',
  name: 'Lobster Plush Toy',
  ratings: {
    stars: 4.5,
    score: 4.5
  },
  priceCents: 35000
}, {
  id: '2025008',
  image: 'images/seaturtle.jpg',
  name: 'Turtle Plush Toy',
  ratings: {
    stars: 4.5,
    score: 4.5
  },
  priceCents: 35000
}, {
  id: '2025009',
  image: 'images/sealplushiee.jpg',
  name: 'Seal Plush Toy',
  ratings: {
    stars: 4.5,
    score: 4.5
  },
  priceCents: 35000
}, {
  id: '2025010',
  image: 'images/whaleplushiee.jpg',
  name: ' Whale Plush Toy',
  ratings: {
    stars: 4.5,
    score: 4.5
  },
  priceCents: 35000
}, {
  id: '2025011',
  image: 'images/placeholder1.jpg',
  name: 'Crab Plush Toy',
  ratings: {
    stars: 4.5,
    score: 4.5
  },
  priceCents: 35000
}, {
  id: '2025012',
  image: 'images/placeholder2.jpg',
  name: 'Otter Plush Toy',
  ratings: {
    stars: 4.5,
    score: 4.5
  },
  priceCents: 35000
}];