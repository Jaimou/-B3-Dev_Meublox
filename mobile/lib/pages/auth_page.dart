import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:meublox/pages/login_or_register_page.dart';
import 'package:meublox/pages/profile_page.dart';

class AuthPage extends StatelessWidget {
  const AuthPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: StreamBuilder<User?>(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) {
          // Si l'utilisateur est connecté, on affiche la page d'accueil
          if (snapshot.hasData) {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (context) => const ProfilePage(),
              ),
            );
            return SizedBox();
          } else {
            // Sinon, on affiche la page de connexion
            return LoginOrRegisterPage();
          }
        },
      ),
    );
  }
}