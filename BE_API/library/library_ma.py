from .extension import ma

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'email', 'created_at')


class ConversationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id', 'started_at', 'ended_at')


class MessageSchema(ma.Schema):
    class Meta:
        fields = ('id', 'conversation_id', 'sender', 'message', 'timestamp')


class FeedbackSchema(ma.Schema):
    class Meta:
        fields = ('id', 'message_id', 'user_id', 'rating', 'comment', 'created_at')
