<h1>Confirm your email address</h1>

<p>Hi {{ $user->name }},</p>

<p>Please click the link below to confirm your email address:</p>

<a href="{{ url('/confirm-email/' . $user->email_verification_token) }}">Confirm Email</a>
