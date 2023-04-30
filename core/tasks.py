from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.conf import settings


@shared_task
def send_email_task(email_address, subject, email_body):
    email = EmailMultiAlternatives(
        subject, 
        strip_tags(email_body),
        settings.EMAIL_HOST_USER,
        [email_address]
    )
    email.attach_alternative(email_body, "text/html")
    return email.send()
