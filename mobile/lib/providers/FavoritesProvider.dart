import 'package:flutter/foundation.dart';

class FavoritesProvider extends ChangeNotifier {
  List<int> favoriteIndices = [];

  void toggleFavorite(int index) {
    if (favoriteIndices.contains(index)) {
      favoriteIndices.remove(index);
    } else {
      favoriteIndices.add(index);
    }
    notifyListeners();
  }
}