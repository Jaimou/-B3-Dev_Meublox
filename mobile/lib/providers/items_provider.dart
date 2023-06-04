import 'package:flutter/foundation.dart';
import 'package:meublox/models/item.dart';

class ItemsProvider extends ChangeNotifier {
  List<Item> items = [
    Item(
      title: "Product Title 1",
      price: 40.98,
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

  List<Item> getFavoriteItems(List<int> favoriteIndices) {
    return favoriteIndices.map((index) => items[index]).toList();
  }
}