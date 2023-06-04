import 'package:flutter/material.dart';
import 'package:meublox/models/Item.dart';
import 'package:meublox/providers/FavoritesProvider.dart';
import 'package:provider/provider.dart';

class ItemsWidget extends StatelessWidget {
  const ItemsWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Item> items = [
      Item(
        title: "Product Title 1",
        price: 40,
        description: "Product Description 1",
        imagePath: "assets/images/article_0.png",
      ),
      Item(
        title: "Product Title 2",
        price: 45,
        description: "Product Description 2",
        imagePath: "assets/images/article_1.png",
      ),
      Item(
        title: "Product Title 3",
        price: 50,
        description: "Product Description 3",
        imagePath: "assets/images/article_2.png",
      ),
      Item(
        title: "Product Title 4",
        price: 55,
        description: "Product Description 4",
        imagePath: "assets/images/article_3.png",
      ),
      Item(
        title: "Product Title 5",
        price: 60,
        description: "Product Description 5",
        imagePath: "assets/images/article_4.png",
      ),
      Item(
        title: "Product Title 6",
        price: 65,
        description: "Product Description 6",
        imagePath: "assets/images/article_5.png",
      ),
      Item(
        title: "Product Title 7",
        price: 70,
        description: "Product Description 7",
        imagePath: "assets/images/article_6.png",
      ),
      Item(
        title: "Product Title 8",
        price: 75,
        description: "Product Description 8",
        imagePath: "assets/images/article_7.png",
      ),
    ];

    return Consumer<FavoritesProvider>(
      builder: (context, favoritesProvider, _) {
        return GridView.count(
          childAspectRatio: 0.7,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          shrinkWrap: true,
          children: [
            for (int i = 0; i < items.length; i++)
              Container(
                padding: const EdgeInsets.only(left: 15, right: 15, top: 10),
                margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 10),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        InkWell(
                          onTap: () {
                            favoritesProvider.toggleFavorite(i);
                          },
                          child: Icon(
                            favoritesProvider.favoriteIndices.contains(i)
                                ? Icons.favorite
                                : Icons.favorite_border,
                            color: Colors.red,
                          ),
                        ),
                      ],
                    ),
                    InkWell(
                      onTap: () {
                        Navigator.pushNamed(context, "itemPage");
                      },
                      child: Container(
                        margin: const EdgeInsets.all(10),
                        height: 120,
                        width: 120,
                        child: Image.asset(items[i].imagePath),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.only(bottom: 10),
                      alignment: Alignment.centerLeft,
                      child: Text(
                        items[i].title,
                        style: const TextStyle(
                          fontSize: 18,
                          color: Color.fromARGB(255, 80, 39, 118),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    Flexible(
                      child: Container(
                        alignment: Alignment.centerLeft,
                        constraints: const BoxConstraints(maxWidth: 200),
                        child: Text(
                          items[i].description,
                          style: const TextStyle(
                            fontSize: 14,
                            color: Colors.grey,
                          ),
                          overflow: TextOverflow.ellipsis,
                          maxLines: 2,
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 15),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            "${items[i].price} €",
                            style: const TextStyle(
                              fontSize: 20,
                              color: Color.fromARGB(255, 80, 39, 118),
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
          ],
        );
      },
    );
  }
}
