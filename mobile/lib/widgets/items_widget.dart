import 'package:flutter/material.dart';
import 'package:meublox/models/item.dart';
import 'package:meublox/pages/item_page.dart';
import 'package:meublox/providers/favorites_provider.dart';
import 'package:meublox/providers/items_provider.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ItemsWidget extends StatefulWidget {
  const ItemsWidget({super.key});

  @override
  State<ItemsWidget> createState() => _ItemsWidgetState();
}

class _ItemsWidgetState extends State<ItemsWidget> {
  late Future<List<Item>> _fetchItemsFuture;

  @override
  void initState() {
    super.initState();
    _fetchItemsFuture = fetchItems();
  }

  @override
  Widget build(BuildContext context) {
    final itemsProvider = Provider.of<ItemsProvider>(context, listen: false);

    return FutureBuilder<List<Item>>(
      future: _fetchItemsFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
        } else if (snapshot.hasError) {
          return Text('Erreur: ${snapshot.error}');
        } else if (snapshot.hasData) {
          final List<Item> items = snapshot.data!;
          itemsProvider.setItems(items);

          return Consumer<FavoritesProvider>(
            builder: (context, favoritesProvider, _) {  
              return GridView.count(
                childAspectRatio: 0.69,
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
                                  favoritesProvider.toggleFavorite(i, items[i]);
                                  if (favoritesProvider.favoriteIndices.contains(i)) {
                                    favoritesProvider.addFavorite(items[i]);
                                  } else {
                                    favoritesProvider.removeFavorite(items[i]);
                                  }
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text(
                                        favoritesProvider.favoriteIndices.contains(i)
                                            ? "Produit ajouté aux favoris"
                                            : "Produit retiré des favoris",
                                      ),
                                      duration: const Duration(seconds: 1),
                                    ),
                                  );
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
                              favoritesProvider.setSelectedItem(items[i]);
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => ItemPage(selectedItem: items[i]),
                                ),
                              );
                            },
                            child: Container(
                              margin: const EdgeInsets.all(5),
                              height: 120,
                              width: 120,
                              child: Image.network(items[i].imagePath![0]),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.only(bottom: 10),
                            alignment: Alignment.centerLeft,
                            child: Text(
                              utf8.decode(items[i].nom.runes.toList()),
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
                                utf8.decode(items[i].description.runes.toList()),
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
                                  "${NumberFormat.decimalPattern().format(items[i].price)} €",
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
        } else {
          return const Text('Aucune donnée trouvée');
        }
      },
    );
  }

  Future<List<Item>> fetchItems() async {
    final response = await http.get(
      Uri.parse('http://10.0.2.2:8000/products'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
    if (response.statusCode == 200) {
      final List<dynamic> jsonData = jsonDecode(response.body);
      final List<Item> items = jsonData.map((data) => Item.fromJson(data)).toList();
      return items;
    } else {
      throw Exception('Erreur lors de la récupération des données');
    }
  }
}
