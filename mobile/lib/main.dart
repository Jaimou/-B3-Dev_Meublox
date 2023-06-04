import 'package:flutter/material.dart';
import 'package:meublox/pages/CartPage.dart';
import 'package:meublox/pages/HomePage.dart';
import 'package:meublox/pages/ItemPage.dart';
import 'package:meublox/pages/SearchPage.dart';
import 'package:meublox/pages/FavoritePage.dart';
import 'package:meublox/providers/FavoritesProvider.dart';
import 'package:meublox/providers/ItemsProvider.dart';
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