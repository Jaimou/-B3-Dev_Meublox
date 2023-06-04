import 'package:flutter/material.dart';
import 'package:meublox/pages/cart_page.dart';
import 'package:meublox/pages/home_page.dart';
import 'package:meublox/pages/item_page.dart';
import 'package:meublox/pages/search_page.dart';
import 'package:meublox/pages/favorite_page.dart';
import 'package:meublox/providers/favorites_provider.dart';
import 'package:meublox/providers/items_provider.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => FavoritesProvider()),
        ChangeNotifierProvider(create: (_) => ItemsProvider()),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => FavoritesProvider(),
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          scaffoldBackgroundColor: Colors.white,
        ),
        routes: {
          "/": (context) => const HomePage(),
          "cartPage": (context) => const CartPage(),
          "itemPage": (context) => const ItemPage(),
          "searchPage": (context) => const SearchPage(),
          "favoritePage": (context) => const FavoritePage(),
        },
      ),
    );
  }
}