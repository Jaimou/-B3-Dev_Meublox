import 'package:flutter/material.dart';
import 'package:meublox/models/item.dart';

class ItemsProvider extends ChangeNotifier {
  List<Item> items = [
    Item(
      id: "1",
      nom: "Product Title 1",
      description: "Product Description 1",
      price: 40,
      imagePath: ["assets/images/article_0.png"],
      couleurs: ["red", "blue", "green", "yellow"],
      stock: 10,
      note: 4,
    ),
    Item(
      id: "2",
      nom: "Product Title 2",
      description: "Product Description 2",
      price: 45,
      imagePath: ["assets/images/article_1.png"],
      couleurs: ["blue", "yellow", "red", "green"],
      stock: 20,
    ),
    Item(
      id: "3",
      nom: "Product Title 3",
      description: "Product Description 3",
      price: 50,
      imagePath: ["assets/images/article_2.png"],
      couleurs: ["green", "red", "blue", "yellow"],
      stock: 30,
      note: 5,
    ),
    Item(
      id: "4",
      nom: "Product Title 4",
      description: "Product Description 4",
      price: 55,
      imagePath: ["assets/images/article_3.png"],
      couleurs: ["yellow", "green", "red", "blue"],
      stock: 40,
    ),
    Item(
      id: "5",
      nom: "Product Title 5",
      description: "Product Description 5",
      price: 60,
      imagePath: ["assets/images/article_4.png"],
      couleurs: ["red", "yellow", "green", "blue"],
      stock: 50,
    ),
    Item(
      id: "6",
      nom: "Product Title 6",
      description: "Product Description 6",
      price: 65,
      imagePath: ["assets/images/article_5.png"],
      couleurs: ["blue", "red", "yellow", "green"],
      stock: 60,
      note: 2,
    ),
    Item(
      id: "7",
      nom: "Product Title 7",
      description: "Product Description 7",
      price: 70,
      imagePath: ["assets/images/article_6.png"],
      couleurs: ["green", "blue", "red", "yellow"],
      stock: 70,
    ),
    Item(
      id: "8",
      nom: "Product Title 8",
      description: "Product Description 8",
      price: 75,
      imagePath: ["assets/images/article_7.png"],
      couleurs: ["yellow", "green", "blue", "red"],
      stock: 80,
      note: 3,
    ),
  ];

  List<Item> getFavoriteItems(List<int> favoriteIndices) {
    return favoriteIndices.map((index) => items[index]).toList();
  }

  void setItems(List<Item> newItems) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
    items = newItems;
    notifyListeners();
  });
  }
}