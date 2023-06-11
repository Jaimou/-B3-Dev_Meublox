import 'package:flutter/material.dart';
import 'package:meublox/components/login_sign_in_button.dart';
import 'package:meublox/components/login_textfield.dart';
import 'package:meublox/components/square_tile.dart';

class ProfileGuestWidget extends StatelessWidget {
  ProfileGuestWidget({super.key});

  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  void signUserIn() {}

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(25),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Connexion',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Color.fromARGB(255, 80, 39, 118),
            ),
          ),
          const SizedBox(height: 20),

          LoginTextField(
            controller: emailController,
            hintText: 'Email',
            obscureText: false,
          ),

          const SizedBox(height: 10),

          LoginTextField(
            controller: passwordController,
            hintText: 'Mot de passe',
            obscureText: true,
          ),

          const SizedBox(height: 10),
          
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              InkWell(
                onTap: () {
                  // Action lorsque "Mot de passe oublié" est cliqué
                },
                child: Text(
                  'Mot de passe oublié ?',
                  style: TextStyle(color: Colors.grey[600]),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          
          LoginSignInButton(
            onTap: signUserIn,
          ),

          const SizedBox(height: 50),

          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 25),
            child: Row(
              children: [
                Expanded(
                  child: Divider(
                    thickness: 0.5,
                    color: Colors.grey[400],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  child: Text(
                    'Ou se connecter avec',
                    style: TextStyle(color: Colors.grey[700]),
                  ),
                ),
                Expanded(
                  child: Divider(
                    thickness: 0.5,
                    color: Colors.grey[400],
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 50),

          const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SquareTile(imagePath: 'assets/images/google.png'),

              SizedBox(width: 25),

              SquareTile(imagePath: 'assets/images/facebook.png'),
            ],
          ),

          const SizedBox(height: 50),

          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Vous n\'avez pas de compte ?',
                style: TextStyle(color: Colors.grey[700]),
              ),
              const SizedBox(width: 4),
              const Text(
                'S\'inscrire',
                style: TextStyle(
                  color: Color.fromARGB(255, 80, 39, 118),
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
