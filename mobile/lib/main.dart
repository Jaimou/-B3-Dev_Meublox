import 'package:flutter/material.dart';
import 'package:meublox/models/item.dart';
import 'package:meublox/pages/auth_page.dart';
import 'package:meublox/pages/cart_page.dart';
import 'package:meublox/pages/home_page.dart';
import 'package:meublox/pages/item_page.dart';
import 'package:meublox/pages/login_or_register_page.dart';
import 'package:meublox/pages/search_page.dart';
import 'package:meublox/pages/favorite_page.dart';
import 'package:meublox/providers/favorites_provider.dart';
import 'package:meublox/providers/items_provider.dart';
import 'package:provider/provider.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(
    MultiProvider(
      providers: [
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
          "itemPage": (context) => ItemPage(selectedItem: ModalRoute.of(context)?.settings.arguments as Item),
          "searchPage": (context) => const SearchPage(),
          "favoritePage": (context) => const FavoritePage(),
          "loginOrRegisterPage": (context) => const LoginOrRegisterPage(),
          "authPage": (context) => const AuthPage(),
        },
      ),
    );
  }
}