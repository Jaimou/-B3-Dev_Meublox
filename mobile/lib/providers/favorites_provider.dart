import 'package:flutter/foundation.dart';
import 'package:meublox/models/item.dart';

class FavoritesProvider extends ChangeNotifier {
  List<int> favoriteIndices = [];
  List<Item> favoriteItems = [];
  Item? selectedItem;

  void toggleFavorite(int index, Item item) {
    if (favoriteIndices.contains(index)) {
      favoriteIndices.remove(index);
      favoriteItems.remove(item);
    } else {
      favoriteIndices.add(index);
      favoriteItems.add(item);
    }
    notifyListeners();
  }

  void addFavorite(Item item) {
    favoriteItems.add(item);
    notifyListeners();
  }

  void removeFavorite(Item item) {
    favoriteItems.remove(item);
    notifyListeners();
  }

  List<Item> getFavoriteItems() {
    return favoriteItems;
  }

  void setSelectedItem(Item item) {
    selectedItem = item;
    notifyListeners();
  }
  
  void clearFavorites() {
    favoriteIndices.clear();
    favoriteItems.clear();
    notifyListeners();
  }
}
