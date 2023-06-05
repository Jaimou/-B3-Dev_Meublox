import 'package:flutter/foundation.dart';
import 'package:meublox/models/item.dart';

class FavoritesProvider extends ChangeNotifier {
  List<int> favoriteIndices = [];
  Item? selectedItem;

  void toggleFavorite(int index) {
    if (favoriteIndices.contains(index)) {
      favoriteIndices.remove(index);
    } else {
      favoriteIndices.add(index);
    }
    notifyListeners();
  }

  void setSelectedItem(Item item) {
    selectedItem = item;
    notifyListeners();
  }

  List<Item> getFavoriteItems(List<Item> allItems) {
    return favoriteIndices.map((index) => allItems[index]).toList();
  }
  
  void clearFavorites() {
    favoriteIndices.clear();
    notifyListeners();
  }
}
