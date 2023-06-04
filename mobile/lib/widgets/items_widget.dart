import 'package:flutter/material.dart';
import 'package:meublox/models/item.dart';
import 'package:meublox/providers/favorites_provider.dart';
import 'package:meublox/providers/items_provider.dart';
import 'package:provider/provider.dart';

class ItemsWidget extends StatelessWidget {
  const ItemsWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final itemsProvider = Provider.of<ItemsProvider>(context, listen: false);
    final List<Item> items = itemsProvider.items;

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
