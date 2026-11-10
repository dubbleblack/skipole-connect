import os

from skipole import SkipoleClient

api_key = os.environ.get("SKIPOLE_API_KEY")
if not api_key:
    raise RuntimeError("Set SKIPOLE_API_KEY in the server-side secret manager.")

usage = SkipoleClient(api_key=api_key).get_usage()
print(f"Available credits: {usage.credits_available}")
print(f"Usage since {usage.period_start}: {usage.usage_by_metric}")
