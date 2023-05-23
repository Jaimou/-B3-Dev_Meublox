import 'package:flutter/material.dart';
import 'package:meublox/widgets/FavoritesWidget.dart';
import '../widgets/FavoriteAppBar.dart';

class FavoritePage extends StatelessWidget {
  const FavoritePage({super.key});
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFEDECF2),
      body: ListView(
        children: [
          FavoriteAppBar(),
          FavoritesWidget(),
        ],
      ),
    );
  }
}
