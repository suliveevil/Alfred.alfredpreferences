FasdUAS 1.101.10   ��   ��    k             l     ��������  ��  ��        l     �� 	 
��   	    AppDelegate.applescript    
 �   2     A p p D e l e g a t e . a p p l e s c r i p t      l     ��  ��       Note Opener     �        N o t e   O p e n e r      l     ��������  ��  ��        l     ��  ��    #   Created by Sean on 12/5/18.     �   :     C r e a t e d   b y   S e a n   o n   1 2 / 5 / 1 8 .      l     ��  ��    = 7  Copyright � 2018 Sean Ballinger. All rights reserved.     �   n     C o p y r i g h t   �   2 0 1 8   S e a n   B a l l i n g e r .   A l l   r i g h t s   r e s e r v e d .      l     ��������  ��  ��         l     ��������  ��  ��      ! " ! h     �� #�� 0 appdelegate AppDelegate # k       $ $  % & % j     �� '
�� 
pare ' 4     �� (
�� 
pcls ( m     ) ) � * *  N S O b j e c t &  + , + l     ��������  ��  ��   ,  - . - l     �� / 0��   /  
 IBOutlets    0 � 1 1    I B O u t l e t s .  2 3 2 j   	 �� 4�� 0 	thewindow 	theWindow 4 m   	 
��
�� 
msng 3  5 6 5 l     ��������  ��  ��   6  7 8 7 x    �� 9����   9 2   ��
�� 
osax��   8  : ; : l     ��������  ��  ��   ;  < = < x    #�� >����   > 4    �� ?
�� 
frmk ? m     @ @ � A A  F o u n d a t i o n��   =  B C B j   # (�� D�� 0 nsstring NSString D N   # ' E E n  # & F G F o   $ &���� 0 nsstring NSString G m   # $��
�� misccura C  H I H j   ) .�� J��  0 nscharacterset NSCharacterSet J N   ) - K K n  ) , L M L o   * ,����  0 nscharacterset NSCharacterSet M m   ) *��
�� misccura I  N O N l     ��������  ��  ��   O  P Q P l     �� R S��   R R L Insert code here to initialize your application before any files are opened    S � T T �   I n s e r t   c o d e   h e r e   t o   i n i t i a l i z e   y o u r   a p p l i c a t i o n   b e f o r e   a n y   f i l e s   a r e   o p e n e d Q  U V U i   / 2 W X W I      �� Y���� B0 applicationwillfinishlaunching_ applicationWillFinishLaunching_ Y  Z�� Z o      ���� 0 anotification aNotification��  ��   X k      [ [  \ ] \ l     �� ^ _��   ^ %  Register the URL Handler stuff    _ � ` ` >   R e g i s t e r   t h e   U R L   H a n d l e r   s t u f f ]  a�� a O     b c b I   
 �� d���� n0 5seteventhandler_andselector_foreventclass_andeventid_ 5setEventHandler_andSelector_forEventClass_andEventID_ d  e f e  f     f  g h g m     i i � j j $ h a n d l e G e t U R L E v e n t : h  k l k n    m n m o    ���� *0 kinterneteventclass kInternetEventClass n m    ��
�� misccura l  o�� o n    p q p o    ���� 0 	kaegeturl 	kAEGetURL q m    ��
�� misccura��  ��   c n     r s r I    �������� 20 sharedappleeventmanager sharedAppleEventManager��  ��   s n     t u t o    ���� *0 nsappleeventmanager NSAppleEventManager u m     ��
�� misccura��   V  v w v l     ��������  ��  ��   w  x y x l     �� z {��   z L F Insert code here to do any housekeeping before your application quits    { � | | �   I n s e r t   c o d e   h e r e   t o   d o   a n y   h o u s e k e e p i n g   b e f o r e   y o u r   a p p l i c a t i o n   q u i t s y  } ~ } i   3 6  �  I      �� ����� :0 applicationshouldterminate_ applicationShouldTerminate_ �  ��� � o      ���� 
0 sender  ��  ��   � L      � � n     � � � o    ����  0 nsterminatenow NSTerminateNow � m     ��
�� misccura ~  � � � l     ��������  ��  ��   �  � � � l     �� � ���   � 0 * Handler that runs when the URL is clicked    � � � � T   H a n d l e r   t h a t   r u n s   w h e n   t h e   U R L   i s   c l i c k e d �  � � � i   7 : � � � I      �� ����� (0 handlegeturlevent_ handleGetURLEvent_ �  ��� � o      ���� 0 ev  ��  ��   � k     � � �  � � � r     
 � � � c      � � � l     ����� � n     � � � I    �� ����� 80 paramdescriptorforkeyword_ paramDescriptorForKeyword_ �  ��� � m     � � AƖ���  ��  ��   � o     ���� 0 ev  ��  ��   � m    ��
�� 
TEXT � o      ���� 0 noteurl noteURL �  � � � l   ��������  ��  ��   �  � � � r     � � � l    ����� � n    � � � I    �� ����� &0 stringwithstring_ stringWithString_ �  ��� � o    ���� 0 noteurl noteURL��  ��   � o    ���� 0 nsstring NSString��  ��   � o      ���� 0 notename noteName �  � � � r     � � � c     � � � l    ����� � n    � � � o    ���� B0 stringbyremovingpercentencoding stringByRemovingPercentEncoding � o    ���� 0 notename noteName��  ��   � m    ��
�� 
ctxt � o      ���� 0 notename noteName �  � � � r     1 � � � n     / � � � 7  ! /�� � �
�� 
ctxt � m   % '���� 	 � l  ( . ����� � I  ( .�� ���
�� .corecnte****       **** � o   ) *���� 0 notename noteName��  ��  ��   � o     !���� 0 notename noteName � o      ���� 0 notename noteName �  � � � l  2 2��������  ��  ��   �  � � � O   2 � � � � k   6 � � �  � � � I  6 ;������
�� .miscactvnull��� ��� null��  ��   �  � � � l  < <��������  ��  ��   �  � � � r   < D � � � N   < B � � n  < A � � � 2   ? A��
�� 
note � 1   < ?�
� 
dfac � o      �~�~ 0 noterefs noteRefs �  � � � r   E J � � � n   E H � � � 1   F H�}
�} 
pnam � o   E F�|�| 0 noterefs noteRefs � o      �{�{ 0 	notenames 	noteNames �  � � � l  K K�z�y�x�z  �y  �x   �  � � � r   K N � � � m   K L�w
�w boovfals � o      �v�v 0 	notefound 	noteFound �  � � � Y   O } ��u � ��t � Z   ] x � ��s�r � E   ] c � � � n   ] a � � � 4   ^ a�q �
�q 
cobj � o   _ `�p�p 0 i   � o   ] ^�o�o 0 	notenames 	noteNames � o   a b�n�n 0 notename noteName � k   f t � �  � � � r   f i � � � m   f g�m
�m boovtrue � o      �l�l 0 	notefound 	noteFound �  � � � I  j r�k ��j
�k .noteshownull���     **** � n   j n � � � 4   k n�i �
�i 
cobj � o   l m�h�h 0 i   � o   j k�g�g 0 noterefs noteRefs�j   �  ��f �  S   s t�f  �s  �r  �u 0 i   � m   R S�e�e  � I  S X�d ��c
�d .corecnte****       **** � o   S T�b�b 0 noterefs noteRefs�c  �t   �  � � � l  ~ ~�a�`�_�a  �`  �_   �  ��^ � Z   ~ � � ��]�\ � =  ~ � � � � o   ~ �[�[ 0 	notefound 	noteFound � m    ��Z
�Z boovfals � I  � ��Y ��X
�Y .sysodlogaskr        TEXT � b   � � � � � b   � � �  � m   � � � ( N o   n o t e   w i t h   t i t l e   "  o   � ��W�W 0 notename noteName � m   � � �  "   w a s   f o u n d .�X  �]  �\  �^   � m   2 3|                                                                                      @ alis      Macintosh HD                   BD ����	Notes.app                                                      ����            ����  
 cu             Applications  /:Applications:Notes.app/    	 N o t e s . a p p    M a c i n t o s h   H D  Applications/Notes.app  / ��   � �V I  � ��U�T�S
�U .aevtquitnull��� ��� null�T  �S  �V   � �R l     �Q�P�O�Q  �P  �O  �R   " 	 l     �N�M�L�N  �M  �L  	 
�K
 l     �J�I�H�J  �I  �H  �K       �G�G   �F�F 0 appdelegate AppDelegate �E #�E 0 appdelegate AppDelegate  �D�C
�D misccura
�C 
pcls �  N S O b j e c t 
�B�A�@�B   �?�>�=�<�;�:�9�8
�? 
pare�> 0 	thewindow 	theWindow
�= 
pimr�< 0 nsstring NSString�;  0 nscharacterset NSCharacterSet�: B0 applicationwillfinishlaunching_ applicationWillFinishLaunching_�9 :0 applicationshouldterminate_ applicationShouldTerminate_�8 (0 handlegeturlevent_ handleGetURLEvent_�A  
�@ 
msng �7�7    �6�5
�6 
cobj    �4
�4 
osax�5   �3�2
�3 
cobj    �1 @
�1 
frmk�2      �0�/
�0 misccura�/ 0 nsstring NSString !! �.�-
�. misccura�-  0 nscharacterset NSCharacterSet �, X�+�*"#�)�, B0 applicationwillfinishlaunching_ applicationWillFinishLaunching_�+ �($�( $  �'�' 0 anotification aNotification�*  " �&�& 0 anotification aNotification# �%�$�# i�"�!� �
�% misccura�$ *0 nsappleeventmanager NSAppleEventManager�# 20 sharedappleeventmanager sharedAppleEventManager�" *0 kinterneteventclass kInternetEventClass�! 0 	kaegeturl 	kAEGetURL�  � n0 5seteventhandler_andselector_foreventclass_andeventid_ 5setEventHandler_andSelector_forEventClass_andEventID_�) ��,j+  *)���,��,�+ U � ���%&�� :0 applicationshouldterminate_ applicationShouldTerminate_� �'� '  �� 
0 sender  �  % �� 
0 sender  & ��
� misccura�  0 nsterminatenow NSTerminateNow� ��,E � ���()�� (0 handlegeturlevent_ handleGetURLEvent_� �*� *  �� 0 ev  �  ( ������
�	� 0 ev  � 0 noteurl noteURL� 0 notename noteName� 0 noterefs noteRefs� 0 	notenames 	noteNames�
 0 	notefound 	noteFound�	 0 i  )  ���������� ������������� 80 paramdescriptorforkeyword_ paramDescriptorForKeyword_
� 
TEXT� &0 stringwithstring_ stringWithString_� B0 stringbyremovingpercentencoding stringByRemovingPercentEncoding
� 
ctxt� 	
� .corecnte****       ****
� .miscactvnull��� ��� null
�  
dfac
�� 
note
�� 
pnam
�� 
cobj
�� .noteshownull���     ****
�� .sysodlogaskr        TEXT
�� .aevtquitnull��� ��� null� ���k+ �&E�Ob  �k+ E�O��,�&E�O�[�\[Z�\Z�j 2E�O� _*j 	O*�,�-E�O��,E�OfE�O -k�j kh ���/� eE�O���/j OY h[OY��O�f  �%a %j Y hUO*j ascr  ��ޭ