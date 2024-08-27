import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagingService } from '../../../services/messaging/messaging.service';
import { Conversation, Message, NewMessage } from '../../../types/types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderByPipe } from '../../../pipes/order-by.pipe';

@Component({
  selector: 'app-mesagging-user',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, OrderByPipe],
  templateUrl: './mesagging-user.component.html',
  styleUrl: './mesagging-user.component.css',
})
export class MesaggingUserComponent implements OnInit {
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  messages: Message[] = [];
  messageForm: FormGroup;
  newConversationName: string = '';

  constructor(
    private messagingService: MessagingService,
    private fb: FormBuilder
  ) {
    this.messageForm = this.fb.group({
      content: [''],
    });
  }

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(): void {
    this.messagingService.getUserConversations().subscribe({
      next: (data: Conversation[]) => {
        this.conversations = data;
      },
      error: (error) => {
        console.error('Error loading conversations', error);
      },
    });
  }

  selectConversation(conversation: Conversation): void {
    this.selectedConversation = conversation;
    this.loadMessages(conversation.id);
  }

  loadMessages(conversationId: number): void {
    {
      this.messagingService.getMessages(conversationId).subscribe({
        next: (data: Message[]) => {
          console.log(data);
          this.messages = data;
        },
        error: (error) => {
          console.error('Error loading messages', error);
        },
      });
    }
  }

  createConversation(): void {
    this.messagingService
      .createConversation(this.newConversationName)
      .subscribe({
        next: (newConversation: Conversation) => {
          this.conversations.unshift(newConversation); //
          this.selectedConversation = newConversation;
          this.loadMessages(newConversation.id);
          console.log(newConversation);
          this.newConversationName = '';
        },
        error: (error) => {
          console.error('Error creating conversation', error);
        },
      });
  }

  sendMessage(event: Event): void {
    if (this.selectedConversation) {
      const content = this.messageForm.get('content')?.value;
      const newMessage: NewMessage = {
        content,
        conversationId: this.selectedConversation.id,
      };
      this.messagingService.createMessage(newMessage).subscribe({
        next: (message: Message) => {
          console.log(message);
          this.messages.unshift(message);
          this.messageForm.reset();
        },
        error: (error) => {
          console.error('Error sending message', error);
        },
      });
    }
  }
}
