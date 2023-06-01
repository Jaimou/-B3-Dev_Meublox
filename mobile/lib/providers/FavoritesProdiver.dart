import 'package:flutter/foundation.dart';

class FavoritesProvider extends ChangeNotifier {
  bool isEditMode = false;

  void toggleEditMode() {
    isEditMode = !isEditMode;
    notifyListeners();
  }
}