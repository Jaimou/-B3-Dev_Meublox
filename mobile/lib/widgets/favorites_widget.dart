import 'package:flutter/material.dart';
import 'package:meublox/providers/favorites_provider.dart';
import 'package:meublox/providers/items_provider.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

class FavoritesWidget extends StatelessWidget {
  const FavoritesWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final itemsProvider = Provider.of<ItemsProvider>(context, listen: false);

    return Consumer<FavoritesProvider>(
      builder: (context, favoritesProvider, _) {
        final favoriteIndices = favoritesProvider.favoriteIndices;
        final favoriteItems = itemsProvider.getFavoriteItems(favoriteIndices);

        return GridView.count(
          childAspectRatio: 2.8,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 1,
          shrinkWrap: true,
          children: favoriteItems.map((item) {
            return Container(
              padding: const EdgeInsets.all(10),
              margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 10),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: const EdgeInsets.only(right: 10),
                    height: 120,
                    width: 120,
                    child: Image.asset(item.imagePath),
                  ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        InkWell(
                          onTap: () {
                            favoritesProvider.setSelectedItem(item);
                            Navigator.pushNamed(context, "itemPage");
                          },
                          child: Container(
                            padding: const EdgeInsets.only(bottom: 8),
                            alignment: Alignment.centerLeft,
                            child: Text(
                              item.title,
                              style: const TextStyle(
                                fontSize: 18,
                                color: Color.fromARGB(255, 80, 39, 118),
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Flexible(
                              child: Container(
                                alignment: Alignment.centerLeft,
                                constraints:
                                    const BoxConstraints(maxWidth: 200),
                                child: Text(
                                  item.description,
                                  style: const TextStyle(
                                    fontSize: 14,
                                    color: Colors.grey,
                                  ),
                                  overflow: TextOverflow.ellipsis,
                                  maxLines: 2,
                                ),
                              ),
                            ),
                            const Icon(
                              Icons.add_shopping_cart,
                              size: 30,
                              color: Color.fromARGB(255, 80, 39, 118),
                            ),
                          ],
                        ),
                        const SizedBox(height: 15),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "${NumberFormat.decimalPattern().format(item.price)} €",
                              style: const TextStyle(
                                fontSize: 18,
                                color: Color.fromARGB(255, 80, 39, 118),
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            );
          }).toList(),
        );
      },
    );
  }
}